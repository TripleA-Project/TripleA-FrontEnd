'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import FitPage from '@/components/Layout/FitPage';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { ServerErrorNotificationTemplate } from '@/constants/notification';

function ChartTimeout() {
  const queryClient = useQueryClient();

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const { content } = ServerErrorNotificationTemplate.Timeout;

  const resetQuery = () => {
    queryClient.removeQueries(['likedSymbolList']);
    if (pathName === '/chart' && tab === 'recommandSymbol') {
      queryClient.removeQueries(['symbol', 'recommand']);
    }

    location.reload();
  };

  useEffect(() => {
    return () => {
      resetQuery();
    };
  }, []); /* eslint-disable-line */

  return (
    <FitPage>
      <div className="box-border flex h-full w-full items-center justify-center p-4">
        <div className="box-border flex w-full flex-col items-center rounded-lg border-transparent bg-white px-4 py-8 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]">
          <div className="mb-2 text-4xl">
            <NotificationIcons.VeryDissatisfied />
          </div>
          <p
            className="mb-2 text-center"
            dangerouslySetInnerHTML={{
              __html: content.trim().replaceAll('\n', '<br />'),
            }}
          />
          <Button bgColorTheme="orange" textColorTheme="white" fullWidth onClick={() => resetQuery()}>
            새로고침
          </Button>
        </div>
      </div>
    </FitPage>
  );
}

export default ChartTimeout;
