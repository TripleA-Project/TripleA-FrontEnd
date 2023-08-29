'use client';

import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { HistoryNotificationTemplate } from '@/constants/notification';
import Link from 'next/link';
import React from 'react';

interface HistoryNotificationContentProps {
  notificationType: keyof typeof HistoryNotificationTemplate;
  onCloseButtonClick: () => void;
}

function HistoryNotificationContent({ notificationType, onCloseButtonClick }: HistoryNotificationContentProps) {
  const { content, linkURL, buttonText } = HistoryNotificationTemplate[notificationType];

  return (
    <div className="sticky top-1/2 mt-[12.5rem] box-border -translate-y-1/2">
      <div className="box-border flex w-full justify-center px-4">
        <div className="relative box-border w-[18rem] rounded-lg bg-white px-8 py-4 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]">
          <div className="absolute right-4 top-2">
            <button
              onClick={() => {
                onCloseButtonClick();
              }}
            >
              <AppIcons.CloseFill.Orange />
            </button>
          </div>
          <div className="mb-2.5 flex flex-col items-center">
            <NotificationIcons.VeryDissatisfied className="mb-2.5 text-4xl" />
            <p
              className="text-center font-bold text-black"
              dangerouslySetInnerHTML={{ __html: content.trim().replaceAll('\n', '<br />') }}
            />
          </div>
          <Link href={linkURL}>
            <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HistoryNotificationContent;
