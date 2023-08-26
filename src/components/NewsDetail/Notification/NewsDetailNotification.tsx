import React from 'react';
import NewsDetailNotificationContent from './NewsDetailNotificationContent';
import { NewsDetailNotificationTemplate } from '@/constants/notification';
import { type NewsDetailPayload, type UserPayload } from '@/interfaces/Dto/News';

interface NewsDetailNotificationProps {
  newsDetail: UserPayload & NewsDetailPayload;
}

function getNotificationType(
  newsDetail: NewsDetailNotificationProps['newsDetail'],
): keyof typeof NewsDetailNotificationTemplate | undefined {
  if (newsDetail.user.leftBenefitCount === 0 && !newsDetail.eng.description) {
    return 'NoReadToday';
  }
}

function NewsDetailNotification({ newsDetail }: NewsDetailNotificationProps) {
  // const notificationType = 'NoReadToday';
  const notificationType = getNotificationType(newsDetail);

  return notificationType ? (
    <>
      <div
        className={`fixed_inner absolute !-left-4 !right-auto -top-4 z-[5] h-[calc(100%+18px)] !w-screen backdrop-blur-sm`}
      />
      <div className="fixed_inner fixed bottom-0 z-[12] w-full !p-0">
        <NewsDetailNotificationContent notificationType={notificationType} />
      </div>
    </>
  ) : null;
}

export default NewsDetailNotification;
