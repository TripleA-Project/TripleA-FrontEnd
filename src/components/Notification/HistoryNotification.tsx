'use client';

import Link from 'next/link';
import NotificationPortal from './NotificationPortal';
import Button from '../Button/Button';
import { NotificationIcons } from './NotificationIcons';
import { type NotificationProps } from './Notification';
import { HistoryNotificationTemplate } from '@/constants/notification';

interface HistoryNotificationProps extends Omit<NotificationProps, 'children'> {
  notificationType: keyof typeof HistoryNotificationTemplate;
}

function HistoryNotification({
  active,
  closeOnClick,
  onClose,
  dimHeight,
  bottom,
  notificationType,
}: HistoryNotificationProps) {
  return (
    <NotificationPortal
      active={active}
      dimHeight={dimHeight}
      bottom={bottom}
      onClose={onClose}
      closeOnClick={closeOnClick}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-[288px] rounded-[10px] bg-white p-[22px] shadow-[0_1px_15px_rgba(90,90,90,0.2)]">
          <div className="flex flex-col items-center">
            <NotificationIcons.VeryDissatisfied className="text-4xl" />
            <div className="mb-2 mt-2.5 text-center font-semibold">
              {HistoryNotificationTemplate[notificationType].content
                .trim()
                .split('\n')
                .map((text) => {
                  return <p key={text}>{text}</p>;
                })}
            </div>
          </div>
          <Link href={HistoryNotificationTemplate[notificationType].linkURL}>
            <Button bgColorTheme="orange" textColorTheme="white" fullWidth className="!h-8 !rounded-[5px]">
              {HistoryNotificationTemplate[notificationType].buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </NotificationPortal>
  );
}

export default HistoryNotification;
