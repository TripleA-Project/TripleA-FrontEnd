'use client';

import { useState, useEffect } from 'react';
import ClockAnimation from '@/components/ClockAnimation';
import { useRouter } from 'next/navigation';

interface SignupCompleteProps {
  hideHeader?: boolean;
}

export default function CompleteSignup(props: SignupCompleteProps) {
  const { replace } = useRouter();
  const [repeatComma, setRepeatComma] = useState('.');

  useEffect(() => {
    const showComma = () => {
      let repeatNum = 1;
      let interval: NodeJS.Timer | null = null;

      return () => {
        if (interval === null) {
          interval = setInterval(() => {
            setRepeatComma('.'.repeat(repeatNum));

            const nextRepeatNum = (repeatNum + 1) % 4;
            repeatNum = nextRepeatNum;
          }, 500);
        }

        return interval;
      };
    };

    const intervalTimer = showComma()();

    replace('/mypage');

    return () => {
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, []); /* eslint-disable-line */

  return (
    <div className="mx-auto flex h-[calc(100vh-115px)] flex-col items-center">
      <h3 className="mb-20 mt-36 flex flex-col items-center text-[32px] font-semibold">
        <p>회원가입이</p>
        <p>완료되었습니다.</p>
      </h3>
      <ClockAnimation />
      <p className="relative mt-11 text-sm font-semibold">
        마이페이지 이동 중<span className="absolute left-full top-0 translate-x-1">{repeatComma}</span>
      </p>
    </div>
  );
}
