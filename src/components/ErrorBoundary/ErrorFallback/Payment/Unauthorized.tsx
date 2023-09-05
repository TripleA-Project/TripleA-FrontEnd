'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import FitPage from '@/components/Layout/FitPage';
import Button from '@/components/Button/Button';

function PaymentUnauthorized() {
  const router = useRouter();

  const title = `
    인증되지 않은 사용자입니다.
  `;

  const content = `
    로그인 후 구독 진행이
    가능합니다.
  `;

  useEffect(() => {
    return () => {
      router.refresh();
    };
  }, []); /* eslint-disable-line */

  return (
    <FitPage>
      <div className="box-border flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full flex-col items-center">
          <div className="text-4xl">
            <NotificationIcons.VeryDissatisfied />
          </div>
          <h3
            className="my-6 text-center text-xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: title.trim().replaceAll('\n', '<br />'),
            }}
          />
          <p
            className="text-center text-[#4E525D]"
            dangerouslySetInnerHTML={{
              __html: content.trim().replaceAll('\n', '<br />'),
            }}
          />
          <Link href={`/`}>
            <Button bgColorTheme="orange" textColorTheme="white">
              로그인 하러가기
            </Button>
          </Link>
        </div>
      </div>
    </FitPage>
  );
}

export default PaymentUnauthorized;
