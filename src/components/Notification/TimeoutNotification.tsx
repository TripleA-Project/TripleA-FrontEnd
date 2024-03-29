'use client';

import NotificationPortal from './NotificationPortal';
import { NotificationIcons } from './NotificationIcons';
import Button from '../Button/Button';
import { type NotificationProps } from './Notification';

interface TimeoutNotificationProps extends Omit<NotificationProps, 'children'> {
  title: string;
  content: string;
}

function TimeoutNotification({ active, closeOnClick, onClose, title, content }: TimeoutNotificationProps) {
  return (
    <>
      <NotificationPortal active={active} onClose={onClose} closeOnClick={closeOnClick}>
        <div className="rounded-tl-2xl rounded-tr-2xl bg-white p-4">
          <div className="mb-4 flex flex-col items-center">
            <NotificationIcons.Error className="mb-2 text-4xl" />
            <h3 className="mb-4 text-2xl font-bold text-[#FD954A]">{title}</h3>
            <p
              className="text-center text-[#4E525D]"
              dangerouslySetInnerHTML={{ __html: content.trim().replaceAll('\n', '<br />') }}
            />
            <Button
              bgColorTheme="orange"
              textColorTheme="white"
              fullWidth
              className="mt-4"
              onClick={() => {
                onClose && onClose('button');
                location.reload();
              }}
            >
              새로고침
            </Button>
          </div>
        </div>
      </NotificationPortal>
    </>
  );
}

export default TimeoutNotification;
