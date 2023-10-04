import React, { cloneElement } from 'react';
import dayjs from 'dayjs';
import { AxiosError, HttpStatusCode } from 'axios';
import Timeout from '../ErrorBoundary/ErrorFallback/common/Timeout';
import HistoryUnauthorized from '../ErrorBoundary/ErrorFallback/History/Unauthorized';
import HistoryInternalServerError from '../ErrorBoundary/ErrorFallback/History/InternalServerError';
import { getProfile } from '@/service/user';
import { getNewsHistory } from '@/service/news';
import { TIMEOUT_CODE } from '@/service/axios';
import { type APIResponse } from '@/interfaces/Dto/Core';
import { getInitialDate } from './helper/calendar';

interface HistoryInitialFetcherProps {
  year: number;
  month: number;
  children: React.ReactElement;
}

async function HistoryInitialFetcher({ year, month, children }: HistoryInitialFetcherProps) {
  const targetDate = getInitialDate({ year, month });

  const userResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });

  if (userResponse instanceof AxiosError) {
    const { code, response } = userResponse as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) return <Timeout />;

    if (response?.data.status === HttpStatusCode.Unauthorized) return <HistoryUnauthorized />;

    return <HistoryInternalServerError />;
  }

  const historyResponse = await getNewsHistory({
    year: Number(targetDate.format('YYYY')),
    month: Number(targetDate.format('M')),
  }).catch((err) => {
    return err as AxiosError;
  });

  if (historyResponse instanceof AxiosError) {
    const { code, response } = historyResponse as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) return <Timeout />;

    return <HistoryInternalServerError />;
  }

  const childComponent = cloneElement(children, {
    user: userResponse.data.data,
    history: historyResponse.data.data,
  });

  return <>{childComponent}</>;
}

export default HistoryInitialFetcher;
