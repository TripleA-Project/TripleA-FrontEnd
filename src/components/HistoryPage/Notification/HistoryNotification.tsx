'use client';

import React, { useState } from 'react';
import HistoryNotificationContent from './HistoryNotificationContent';
import { HistoryNotificationTemplate } from '@/constants/notification';
import { type ProfilePayload } from '@/interfaces/Dto/User';

interface HistoryNotificationProps {
  user?: ProfilePayload;
}

function getNotificationType(user?: ProfilePayload): keyof typeof HistoryNotificationTemplate | undefined {
  if (!user) return 'LoginRequired';
  if (user.membership === 'BASIC') return 'RequiredSubscribe';

  return;
}

function HistoryNotification({ user }: HistoryNotificationProps) {
  const [contentOpen, setContentOpen] = useState(true);
  const notificationType = getNotificationType(user);

  return notificationType ? (
    <div
      className={`fixed_inner absolute !-left-4 !right-auto -top-4 z-[5] h-[calc(100%+18px)] !w-screen !p-0 backdrop-blur-sm`}
    >
      {contentOpen ? (
        <HistoryNotificationContent
          notificationType={notificationType}
          onCloseButtonClick={() => {
            setContentOpen(false);
          }}
        />
      ) : null}
    </div>
  ) : null;
}

export default HistoryNotification;
