import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { NewsDetailNotificationTemplate } from '@/constants/notification';
import Link from 'next/link';
import React from 'react';

interface NewsDetailNotificationContentProps {
  notificationType: keyof typeof NewsDetailNotificationTemplate;
}

function NewsDetailNotificationContent({ notificationType }: NewsDetailNotificationContentProps) {
  const { title, content, buttonText, linkURL } = NewsDetailNotificationTemplate[notificationType];

  return (
    <div className="box-border rounded-tl-2xl rounded-tr-2xl border-transparent bg-white drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]">
      <div className="box-border p-4">
        <div className="mb-[42px] mt-11 flex flex-col items-center">
          <NotificationIcons.VeryDissatisfied className="text-4xl" />
          <h3
            className="my-6 text-center text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: title.trim().replaceAll('\n', '<br />') }}
          />
          <p
            className="text-center text-[#4E525D]"
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
  );
}

export default NewsDetailNotificationContent;
