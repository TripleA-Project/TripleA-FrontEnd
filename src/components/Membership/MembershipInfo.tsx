'use client';

import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '@/service/user';
import { unSubscribe } from '@/service/subscribe';

function MembershipInfo() {
  const queryClient = useQueryClient();

  const { data: profileResponse } = useQuery(['profile'], () => getProfile());

  const { mutate: unSubscribeMutate, status: unSubscribeStatus } = useMutation(() => unSubscribe(), {
    onSuccess: async () => {
      console.log('구독해제 되었습니다.');
      queryClient.removeQueries(['auth']);
      queryClient.invalidateQueries(['profile']);
    },
    retry: 0,
  });

  return (
    <div className="mb-8 mt-11 box-border flex items-center justify-between rounded-[10px] bg-[#F5F7F9] px-[18.68px] py-[21px]">
      <div className="pl-[20.82px]">
        <div className="mb-2.5 font-bold">멤버십 / 결제 정보</div>
        <div className={`${profileResponse?.data.data?.membership === 'BASIC' ? 'mb-1.5' : ''}`}>
          <span className="font-semibold text-[#5B6267]">현재 구독 상태 : </span>
          <span className="font-semibold text-[#FD954A]">
            {!profileResponse?.data.data?.membership
              ? ''
              : profileResponse.data.data.membership === 'BASIC'
              ? '일반회원'
              : '유료회원'}
          </span>
        </div>
        {profileResponse?.data.data?.membership === 'PREMIUM' ? (
          <button
            className="mb-1.5 mt-[15px] border-b-2 border-b-[#777777] text-sm font-semibold text-[#777777] disabled:cursor-not-allowed disabled:text-violet-400/60"
            disabled={unSubscribeStatus === 'loading'}
            onClick={() => unSubscribeMutate()}
          >
            해지하기
          </button>
        ) : null}
      </div>
      <Link href="/mypage/membership">
        <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
      </Link>
    </div>
  );
}

export default MembershipInfo;
