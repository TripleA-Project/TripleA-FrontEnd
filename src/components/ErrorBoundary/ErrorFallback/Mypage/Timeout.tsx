'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import FitPage from '@/components/Layout/FitPage';
import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { ServerErrorNotificationTemplate } from '@/constants/notification';

function MypageTimeout() {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

  const { title, content } = ServerErrorNotificationTemplate.Timeout;

  useEffect(() => {
    return () => {
      queryClient.refetchQueries(['profile']);

      refresh();
    };
  }, []); /* eslint-disable-line */

  return (
    <FitPage>
      <div className="box-border flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full flex-col items-center">
          <div className="mb-2 text-4xl">
            <NotificationIcons.Error />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-[#FD954A]">{title}</h3>
          <p
            className="mb-2 text-center"
            dangerouslySetInnerHTML={{
              __html: content.trim().replaceAll('\n', '<br />'),
            }}
          />
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            onClick={() => {
              queryClient.refetchQueries(['profile']);

              refresh();
            }}
          >
            새로 고침
          </Button>
        </div>
      </div>
    </FitPage>
  );
}

export default MypageTimeout;
