'use client';

import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { LockNotificationTemplate } from '@/constants/notification';
import Link from 'next/link';
import React from 'react';

interface SymbolChartNotificationContentProps {
  notificationType: keyof typeof LockNotificationTemplate;
}

function SymbolChartNotificationContent({ notificationType }: SymbolChartNotificationContentProps) {
  const { title, content, buttonText, linkURL } = LockNotificationTemplate[notificationType];

  return (
    <div
      className={`box-border rounded-tl-2xl rounded-tr-2xl border-transparent bg-white p-4 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]`}
    >
      <div className="flex flex-col items-center">
        <h3 className="mb-2.5 text-2xl font-bold text-[#FD954A]">{title}</h3>
        <p
          className="text-center text-[#4E525D]"
          dangerouslySetInnerHTML={{ __html: content.trim().replaceAll('\n', '<br />') }}
        />
        <div className="mt-6">
          <NotificationIcons.Lock />
        </div>
      </div>
      <Link href={linkURL}>
        <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}

export default SymbolChartNotificationContent;
