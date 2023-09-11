import React, { cloneElement } from 'react';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import ChartUnauthorized from '../ErrorBoundary/ErrorFallback/Chart/Unauthorized';
import ChartTimeout from '../ErrorBoundary/ErrorFallback/Chart/Timeout';
import ChartInternalServerError from '../ErrorBoundary/ErrorFallback/Chart/InternalServerError';
import NotFound from '../NotFound';
import BackButtonHeader from '../Layout/Header/BackButtonHeader';
import { TIMEOUT_CODE } from '@/service/axios';
import { getProfile } from '@/service/user';
import { getSymbol } from '@/service/symbol';
import type { APIResponse } from '@/interfaces/Dto/Core';
import type { GetSymbolResponse } from '@/interfaces/Dto/Symbol';
import type { ResampleFrequency } from '@/interfaces/Dto/Stock';
import type { ProfileResponse } from '@/interfaces/Dto/User';

interface SymbolChartFetcherProps {
  symbol: string;
  resample: ResampleFrequency;
  children: React.ReactElement;
}

async function SymbolChartFetcher({ symbol, resample, children }: SymbolChartFetcherProps) {
  const profileResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });

  if (profileResponse instanceof AxiosError) {
    const { code, response } = profileResponse as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) {
      return <ChartTimeout />;
    }

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return <ChartUnauthorized continuePath={`/chart/symbol?name=${symbol}&resample=${resample}`} />;
    }

    return <ChartInternalServerError />;
  }

  const matchedSymbolResponse = await getSymbol({ symbol }).catch((err) => {
    return err as AxiosError;
  });

  if (matchedSymbolResponse instanceof AxiosError) {
    const { code } = matchedSymbolResponse as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) {
      return <ChartTimeout />;
    }

    return <ChartInternalServerError />;
  }

  const profilePayload = (profileResponse as AxiosResponse<ProfileResponse>).data.data;
  const matchedSymbolPayload = (matchedSymbolResponse as AxiosResponse<GetSymbolResponse>).data.data;

  if (!matchedSymbolPayload?.length) {
    return (
      <>
        <BackButtonHeader />
        <NotFound />
      </>
    );
  }

  const childComponent = cloneElement(children, {
    user: profilePayload,
    matchedSymbol: matchedSymbolPayload[0],
  });

  return <>{childComponent}</>;
}

export default SymbolChartFetcher;
