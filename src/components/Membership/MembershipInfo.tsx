'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unSubscribe } from '@/service/subscribe';
import { ProfilePayload } from '@/interfaces/Dto/User';
import { useState } from 'react';
import UnsubscribeDialog from './Dialog/UnsubscribeDialog';
import { toastNotify } from '@/util/toastNotify';
import dayjs from 'dayjs';

interface MembershipInfoProps {
  user?: ProfilePayload;
}

function MembershipInfo({ user }: MembershipInfoProps) {
  const { refresh } = useRouter();
  const queryClient = useQueryClient();

  const [openUnsubscribeDialog, setOpenUnsubscribeDialog] = useState(false);

  const { mutate: unSubscribeMutate, status: unSubscribeStatus } = useMutation(() => unSubscribe(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);

      toastNotify('success', '구독이 해지 되었습니다');

      refresh();
    },
    onError: () => {
      toastNotify('error', '구독 해지에 실패하였습니다');
    },
    retry: 0,
  });

  return (
    <div className="mb-8 mt-11 box-border flex items-center justify-between rounded-[10px] bg-[#F5F7F9] px-[18.68px] py-[21px]">
      <div className="pl-[20.82px]">
        <div className="mb-2.5 font-bold">멤버십 / 결제 정보</div>
        <div className={`${user?.membership === 'BASIC' ? 'mb-1.5' : ''}`}>
          <span className="font-semibold text-[#5B6267]">현재 구독 상태 : </span>
          <span className="font-semibold text-[#FD954A]">
            {!user?.membership ? '' : user?.membership === 'BASIC' ? '일반회원' : '유료회원'}
          </span>
        </div>
        {user?.membership === 'PREMIUM' ? (
          <>
            <div className="mt-1.5">
              <span className="font-semibold text-[#5B6267]">다음 결제일 : </span>
              <span className="font-semibold text-[#FD954A]">
                {user.nextPaymentDate ? dayjs(user.nextPaymentDate).format('YYYY/MM/DD') : ''}
              </span>
            </div>
            <button
              className="mb-1.5 mt-[15px] border-b-2 border-b-[#777777] text-sm font-semibold text-[#777777] disabled:cursor-not-allowed disabled:text-violet-400/60"
              disabled={unSubscribeStatus === 'loading'}
              onClick={() => {
                setOpenUnsubscribeDialog(true);
              }}
            >
              해지하기
            </button>
          </>
        ) : null}
      </div>
      <Link href="/mypage/membership">
        <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
      </Link>
      <UnsubscribeDialog
        open={openUnsubscribeDialog}
        onClose={() => setOpenUnsubscribeDialog(false)}
        mutateFunction={unSubscribeMutate}
        mutationStatus={unSubscribeStatus}
      />
    </div>
  );
}

export default MembershipInfo;
