'use client';

import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { HistoryNotificationTemplate } from '@/constants/notification';
import { useRouter } from 'next/navigation';
import React from 'react';

function HistoryNewsTimeout() {
  const router = useRouter();
  const { content, buttonText } = HistoryNotificationTemplate.Timeout;

  return (
    <div className="box-border flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full flex-col items-center">
        <div className="mb-2 text-4xl">
          <NotificationIcons.Error />
        </div>
        <p
          className="mb-2 text-center"
          dangerouslySetInnerHTML={{
            __html: content.trim().replaceAll('\n', '<br />'),
          }}
        />
        <Button
          bgColorTheme="orange"
          textColorTheme="white"
          onClick={() => {
            router.refresh();
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default HistoryNewsTimeout;
