'use client';

import Link from 'next/link';
import NotificationPortal from './NotificationPortal';
import Button from '../Button/Button';
import { NotificationIcons } from './NotificationIcons';
import { type NotificationProps } from './Notification';

interface ErrorNotificationProps extends Omit<NotificationProps, 'children'> {
  content: string;
  buttonText: string;
  linkURL: string;
}

function ErrorNotification({
  active,
  closeOnClick,
  onClose,
  dimHeight,
  content,
  buttonText,
  linkURL,
}: ErrorNotificationProps) {
  return (
    <NotificationPortal active={active} dimHeight={dimHeight} onClose={onClose} closeOnClick={closeOnClick}>
      <div className="bg-white p-4">
        <div className="mb-[78px] mt-14 flex flex-col items-center">
          <NotificationIcons.Error className="mb-10 text-4xl" />
          {content
            .trim()
            .split('\n')
            .map((text) => {
              return (
                <p key={text} className="font-bold">
                  {text}
                </p>
              );
            })}
        </div>
        {linkURL !== '' ? (
          <Link href={linkURL}>
            <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
              {buttonText}
            </Button>
          </Link>
        ) : (
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            fullWidth
            onClick={(e) => {
              onClose && onClose('button');
            }}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </NotificationPortal>
  );
}

export default ErrorNotification;
