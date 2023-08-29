'use client';

import React, { cloneElement } from 'react';
import { AxiosError } from 'axios';
import { useQueries } from '@tanstack/react-query';
import HistoryNewsTimeout from '../ErrorBoundary/ErrorFallback/History/HistoryNewsTimeout';
import HistoryInternalServerError from '../ErrorBoundary/ErrorFallback/History/InternalServerError';
import { getNewsById } from '@/service/news';
import { TIMEOUT_CODE } from '@/service/axios';
import { createHistoryNewsList, getFetchNewsIdList } from './helper/historyNewsUtil';
import { type HistoryPayload } from '@/interfaces/Dto/History';
import { type CalenderDate } from '../Calendar/MuiCalendar';

interface HistoryNewsListFetcherProps {
  targetDate: CalenderDate;
  history?: HistoryPayload;
  children: React.ReactElement;
}

function HistoryNewsListFetcher({ history, targetDate, children }: HistoryNewsListFetcherProps) {
  const fetchIdList = history ? getFetchNewsIdList(history, targetDate) : [];

  const newsListQueries = useQueries({
    queries: fetchIdList?.length
      ? fetchIdList.map((newsId) => {
          return {
            queryFn: () => {
              return getNewsById({ id: newsId });
            },
            queryKey: ['history', newsId],
            retry: 0,
            refetchOnWindowFocus: false,
            suspense: true,
            useErrorBoundary: false,
          };
        })
      : [],
  });

  if (!history) return null;

  const error = newsListQueries[0]?.error;

  if (error) {
    if (error instanceof AxiosError) {
      const { code } = error as AxiosError;

      if (code === TIMEOUT_CODE) {
        return <HistoryNewsTimeout />;
      }
    }
    return <HistoryInternalServerError />;
  }

  const historyNewsListSource = createHistoryNewsList({ targetDate, newsListQueries, historyList: history });

  const childComponent = cloneElement(children, {
    historyNewsListSource,
  });

  return <>{childComponent}</>;
}

export default HistoryNewsListFetcher;
