'use client';

import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import FitPage from '@/components/Layout/FitPage';
import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { ServerErrorNotificationTemplate } from '@/constants/notification';
import { LatestNewsResponse } from '@/interfaces/Dto/News';

interface LatestNewsTimeoutProps {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<InfiniteData<AxiosResponse<LatestNewsResponse, any>>, unknown>>;
}

function LatestNewsTimeout({ refetch }: LatestNewsTimeoutProps) {
  const { refresh } = useRouter();
  const { title, content } = ServerErrorNotificationTemplate.Timeout;

  useEffect(() => {
    refresh();

    refetch();
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
              refresh();

              refetch();
            }}
          >
            새로 고침
          </Button>
        </div>
      </div>
    </FitPage>
  );
}

export default LatestNewsTimeout;
