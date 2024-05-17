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
import { twMerge } from 'tailwind-merge';

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
        <MembershipStatus
          onUnSubscribe={() => setOpenUnsubscribeDialog(true)}
          unSubscribeStatus={unSubscribeStatus}
          {...user}
        />
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

const MembershipStatus = ({
  freeTrial,
  freeTierStartDate,
  freeTierEndDate,
  membership,
  nextPaymentDate,
  onUnSubscribe,
  unSubscribeStatus,
}: Partial<ProfilePayload> & { onUnSubscribe: () => void; unSubscribeStatus: any }) => {
  return (
    <>
      <SubscribeStatus freeTrial={freeTrial} membership={membership} />
      <SubscribeDateStatus
        freeTrial={freeTrial}
        freeTierStartDate={freeTierStartDate}
        freeTierEndDate={freeTierEndDate}
        membership={membership}
        nextPaymentDate={nextPaymentDate}
        onUnSubscribe={onUnSubscribe}
        unSubscribeStatus={unSubscribeStatus}
      />
    </>
  );
};

const SubscribeStatus = ({ freeTrial, membership }: Partial<Pick<ProfilePayload, 'freeTrial' | 'membership'>>) => {
  const subscribeWrapperClassNames = twMerge([!freeTrial && membership === 'BASIC' ? 'mb-1.5' : '']);

  if (freeTrial) {
    return (
      <div className={subscribeWrapperClassNames}>
        <span className="font-semibold text-[#5B6267]">현재 구독 상태 : </span>
        <span className="font-semibold text-[#FD954A]">무료체험 이용 중</span>
      </div>
    );
  }

  return (
    <div className={subscribeWrapperClassNames}>
      <span className="font-semibold text-[#5B6267]">현재 구독 상태 : </span>
      <span className="font-semibold text-[#FD954A]">
        {!membership ? '' : membership === 'BASIC' ? '일반회원' : '유료회원'}
      </span>
    </div>
  );
};

const SubscribeDateStatus = ({
  freeTrial,
  freeTierStartDate,
  freeTierEndDate,
  membership,
  nextPaymentDate,
  onUnSubscribe,
  unSubscribeStatus,
}: Partial<
  Pick<ProfilePayload, 'freeTrial' | 'membership' | 'nextPaymentDate' | 'freeTierStartDate' | 'freeTierEndDate'>
> & {
  onUnSubscribe: () => void;
  unSubscribeStatus: any;
}) => {
  if (freeTrial) {
    return (
      <div className="mb-1.5 mt-1.5">
        <span className="font-semibold text-[#5B6267]">무료체험 기간 : </span>
        <span className="font-semibold text-[#FD954A]">
          {freeTierStartDate && freeTierEndDate
            ? `${dayjs(freeTierStartDate).format('YYYY/MM/DD')} ~ ${dayjs(freeTierEndDate).format('YYYY/MM/DD')}`
            : ''}
        </span>
      </div>
    );
  }

  if (membership === 'PREMIUM') {
    return (
      <>
        <div className="mt-1.5">
          <span className="font-semibold text-[#5B6267]">다음 결제일 : </span>
          <span className="font-semibold text-[#FD954A]">
            {nextPaymentDate ? dayjs(nextPaymentDate).format('YYYY/MM/DD') : ''}
          </span>
        </div>
        <button
          className="mb-1.5 mt-[15px] border-b-2 border-b-[#777777] text-sm font-semibold text-[#777777] disabled:cursor-not-allowed disabled:text-violet-400/60"
          disabled={unSubscribeStatus === 'loading'}
          onClick={onUnSubscribe}
        >
          해지하기
        </button>
      </>
    );
  }

  return null;
};
