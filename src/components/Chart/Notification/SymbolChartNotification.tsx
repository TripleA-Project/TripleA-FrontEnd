'use client';

import { LockNotificationTemplate } from '@/constants/notification';
import { ProfilePayload } from '@/interfaces/Dto/User';
import React from 'react';
import SymbolChartNotificationContent from './SymbolChartNotificationContent';

interface SymbolChartNotificationProps {
  user?: ProfilePayload;
}

function getNotificationType(user?: ProfilePayload): keyof typeof LockNotificationTemplate | undefined {
  if (user?.membership === 'BASIC') {
    return 'MoreLikeRequiredSubscribe';
  }
}

function SymbolChartNotification({ user }: SymbolChartNotificationProps) {
  const notificationType = getNotificationType(user);

  return notificationType ? (
    <>
      <div className={`fixed_inner absolute z-[5] h-full !w-screen backdrop-blur-sm`} />
      <div className="fixed_inner fixed bottom-0 z-[12] w-full !p-0">
        <SymbolChartNotificationContent notificationType={notificationType} />
      </div>
    </>
  ) : null;
}

export default SymbolChartNotification;
