'use client';

import Link from 'next/link';
import NotificationPortal from './NotificationPortal';
import Button from '../Button/Button';
import { NotificationIcons } from './NotificationIcons';
import { NewsDetailNotificationTemplate } from '@/constants/notification';
import { type NotificationProps } from './Notification';

interface NewsDetailNotificationProps extends Omit<NotificationProps, 'children'> {
  notificationType: keyof typeof NewsDetailNotificationTemplate;
  newsId: number;
  symbol?: string;
}

function NewsDetailNotification({
  active,
  closeOnClick,
  onClose,
  dimHeight,
  notificationType,
  newsId,
  symbol,
}: NewsDetailNotificationProps) {
  return (
    <NotificationPortal active={active} dimHeight={dimHeight} onClose={onClose} closeOnClick={closeOnClick}>
      <div className="rounded-tl-2xl rounded-tr-2xl bg-white p-4">
        <div className="mb-[42px] mt-11 flex flex-col items-center">
          <NotificationIcons.VeryDissatisfied className="text-4xl " />
          <h3
            className="my-6 text-center text-xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: NewsDetailNotificationTemplate[notificationType].title.trim().replaceAll('\n', '<br />'),
            }}
          />
          <p
            className="text-center text-[#4E525D]"
            dangerouslySetInnerHTML={{
              __html: NewsDetailNotificationTemplate[notificationType].content.trim().replaceAll('\n', '<br />'),
            }}
          />
        </div>
        <Link
          href={
            NewsDetailNotificationTemplate[notificationType].linkURL === '/login'
              ? `/login?continueURL=/detail/${newsId}${symbol ? `?symbol=${symbol}` : ''}`
              : NewsDetailNotificationTemplate[notificationType].linkURL
          }
        >
          <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
            {NewsDetailNotificationTemplate[notificationType].buttonText}
          </Button>
        </Link>
      </div>
    </NotificationPortal>
  );
}

export default NewsDetailNotification;
