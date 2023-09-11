'use client';

import React from 'react';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { ServerErrorNotificationTemplate } from '@/constants/notification';
import Button from '@/components/Button/Button';

function ChartInternalServerError() {
  const { title, content } = ServerErrorNotificationTemplate.InternalServerError;

  return (
    <div className="box-border flex w-full items-center justify-center p-4">
      <div className="flex w-full flex-col items-center">
        <div className="mb-2 text-4xl">
          <NotificationIcons.Error />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-[#FD954A]">{title}</h3>
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
            location.reload();
          }}
        >
          새로 고침
        </Button>
      </div>
    </div>
  );
}

export default ChartInternalServerError;
