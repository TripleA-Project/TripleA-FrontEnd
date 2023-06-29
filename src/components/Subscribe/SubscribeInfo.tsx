'use client';

import { MEMBERSHIP } from '@/interfaces/User';
import { unSubscribe } from '@/service/subscribe';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

interface SubscribeInfoProps {
  membership?: keyof typeof MEMBERSHIP;
}

function SubscribeInfo({ membership }: SubscribeInfoProps) {
  const { mutate: unSubscribeMutate, status } = useMutation(() => unSubscribe(), {
    onSuccess: async () => {
      alert('구독해제 되었습니다.');
    },
    retry: 0,
  });

  return (
    <div className="mb-8 mt-11 box-border flex items-center justify-between bg-[#F5F7F9] px-[18.68px] py-[21px]">
      <div className="pb-1.5 pl-[20.82px]">
        <div className="font-bold">멤버십 결제 정보</div>
        <div>
          <span className="font-semibold text-[#5B6267]">현재 구독 상태 : </span>
          <span className="font-semibold text-[#FD954A]">
            {!membership ? '' : membership === 'BASIC' ? '일반회원' : '유료회원'}
          </span>
        </div>
        <button
          className="font-semibold text-[#786BE4] disabled:cursor-not-allowed disabled:text-violet-400/60"
          disabled={status === 'loading'}
          onClick={() => unSubscribeMutate()}
        >
          해지하기
        </button>
      </div>
      <Link href="/me/edit/subscribe">
        <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
      </Link>
    </div>
  );
}

export default SubscribeInfo;
