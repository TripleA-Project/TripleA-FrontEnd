'use client';

import React from 'react';
import Link from 'next/link';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import FitPage from '@/components/Layout/FitPage';
import Button from '@/components/Button/Button';
import { HistoryNotificationTemplate } from '@/constants/notification';

function HistoryUnauthorized() {
  const { content, linkURL, buttonText } = HistoryNotificationTemplate.LoginRequired;

  return (
    <FitPage>
      <div className="box-border flex h-full w-full items-center justify-center p-4">
        <div className="box-border flex w-full flex-col items-center rounded-lg border-transparent bg-white px-4 py-8 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]">
          <div className="mb-2 text-4xl">
            <NotificationIcons.VeryDissatisfied />
          </div>
          <p
            className="mb-2 text-center"
            dangerouslySetInnerHTML={{
              __html: content.trim().replaceAll('\n', '<br />'),
            }}
          />
          <Link href={linkURL} className="w-full">
            <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </FitPage>
  );
}

export default HistoryUnauthorized;
