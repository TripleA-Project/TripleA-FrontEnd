'use client';

import Link from 'next/link';
import NotificationPortal from './NotificationPortal';
import Button from '../Button/Button';
import { NotificationIcons } from './NotificationIcons';
import { type NotificationProps } from './Notification';

interface LockNotificationProps extends Omit<NotificationProps, 'children'> {
  dimHeight?: number;
  title: string;
  content: string;
  buttonText: string;
  linkURL: string;
}

function LockNotification({
  active,
  closeOnClick,
  onClose,
  dimHeight,
  title,
  content,
  buttonText,
  linkURL,
}: LockNotificationProps) {
  return (
    <>
      <NotificationPortal active={active} onClose={onClose} closeOnClick={closeOnClick} dimHeight={dimHeight}>
        <div className="rounded-tl-2xl rounded-tr-2xl bg-white p-4">
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
      </NotificationPortal>
    </>
  );
}

export default LockNotification;
