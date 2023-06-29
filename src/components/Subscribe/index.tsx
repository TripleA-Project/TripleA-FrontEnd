'use client';

import { APIResponse } from '@/interfaces/Dto/Core';
import { subscribe } from '@/service/subscribe';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ChartNotify } from '../Chart';
import { getProfile } from '@/service/user';
import Button from '../Button/Button';
import { MdCheck } from 'react-icons/md';
import { useRouter } from 'next/navigation';

function Subscribe() {
  const [subscribeStatus, setSubscribeStatus] = useState<{ loginRequired: boolean }>({
    loginRequired: false,
  });

  const router = useRouter();

  const {
    data: membership,
    status,
    error,
  } = useQuery(['subscribe', 'edit'], () => getProfile(), {
    refetchOnWindowFocus: false,
    retry: 0,
    select: (response) => response.data.data?.membership,
  });

  useEffect(() => {
    if (!error) return;

    const errorPayload = (error as AxiosError<APIResponse>).response?.data;

    if (errorPayload?.status === 401) {
      setSubscribeStatus((prev) => ({ ...prev, loginRequired: true }));

      return;
    }
  }, [error]);

  useLayoutEffect(() => {
    if (status === 'success') {
    }
  }, [status]); /* eslint-disable-line */

  return (
    <>
      <div
        className={`mt-[27px] box-border justify-center bg-[#F5F7F9] px-9 py-7 ${
          subscribeStatus.loginRequired ? 'pointer-events-none overflow-hidden blur-sm' : ''
        }`}
      >
        {status !== 'loading' ? (
          <div className="flex flex-col gap-6">
            <div className="box-border rounded-[10px] bg-white px-6 py-7">
              <div className="relative w-fit">
                <div className="absolute bottom-1 h-[7px] w-[84px] -translate-x-[2px] bg-[#FFC499]" />
                <h3 className="relative mb-5 w-fit text-xl font-bold">유료회원</h3>
              </div>
              <ul className="mb-2 flex flex-col gap-[10px]">
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">뉴스 요약문 무제한 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">관심 심볼 및 카테고리 무제한 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">기사 북마크 기능 무제한 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">차트보기 제공</span>
                </li>
              </ul>
              <p className="my-6 text-center text-lg font-bold">월 {Intl.NumberFormat('ko').format(10000)}원</p>
              <Button
                bgColorTheme="orange"
                textColorTheme="white"
                className="disabled:!bg-[#898A8D]"
                disabled={membership === 'PREMIUM'}
                onClick={async () => {
                  if (membership === 'PREMIUM') return;

                  const res = await subscribe({ url: 'https://stock.moya.ai/payment' });

                  router.push(res.data.data?.payment!);
                }}
              >
                {membership === 'PREMIUM' ? '구독중' : '구독하기'}
              </Button>
            </div>
            <div className="box-border rounded-[10px] bg-white px-6 py-7">
              <div className="relative w-fit">
                <div className="absolute bottom-1 h-[7px] w-[84px] -translate-x-[2px] bg-[#FFC499]" />
                <h3 className="relative mb-5 w-fit text-xl font-bold">일반회원</h3>
              </div>
              <ul className="mb-2 flex flex-col gap-[10px]">
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">뉴스 요약문 매일 10개 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">관심 심볼 및 카테고리 3개까지 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">북마크 기능 무제한 제공</span>
                </li>
              </ul>
            </div>
            <div className="box-border rounded-[10px] bg-white px-6 py-7">
              <div className="relative w-fit">
                <div className="absolute bottom-1 h-[7px] w-[65px] -translate-x-[2px] bg-[#FFC499]" />
                <h3 className="relative mb-5 w-fit text-xl font-bold">비회원</h3>
              </div>
              <ul className="mb-2 flex flex-col gap-[10px]">
                <li className="flex items-center gap-2">
                  <MdCheck className="shrink-0 text-2xl" />
                  <span className="text-sm">뉴스 리스트 무제한 조회</span>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
      {subscribeStatus.loginRequired ? (
        <ChartNotify
          title="로그인이 필요합니다"
          content="로그인 후 이용해주세요"
          buttonText="로그인하러 가기"
          linkTarget="/login"
        />
      ) : null}
    </>
  );
}

export default Subscribe;
