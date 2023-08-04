'use client';

import React from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import SymbolLikeHeader from '../Layout/Header/LikeHeader/SymbolLikeHeader';
import Chart from './Chart';
import NotFound from '../NotFound';
import { getSymbol } from '@/service/symbol';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';

function ChartSymbolPage() {
  const searchParams = useSearchParams();
  const symbolName = searchParams.get('name');
  const resample = searchParams.get('resample');

  const {
    data: matchedSymbolResponse,
    status: matchedSymbolStatus,
    error: matchedSymbolError,
  } = useQuery(
    ['symbol', 'matched', symbolName],
    () => getSymbol({ symbol: symbolName ? symbolName.toUpperCase() : '' }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  if (matchedSymbolStatus === 'loading') return null;

  if (matchedSymbolStatus === 'error') {
    if (isAxiosError(matchedSymbolError)) {
      const { response } = matchedSymbolError;

      if (response?.status === HttpStatusCode.Unauthorized) {
        redirect(`/login?continueURL=/chart/symbol?name=${symbolName}&resample=${resample ?? 'daily'}`);
      }
    }
  }

  if (matchedSymbolResponse?.status === HttpStatusCode.Unauthorized) {
    redirect(`/login?continueURL=/chart/symbol?name=${symbolName}&resample=${resample ?? 'daily'}`);
  }

  return (
    <>
      <SymbolLikeHeader symbol={matchedSymbolResponse?.data ? matchedSymbolResponse.data[0] : undefined} />
      {matchedSymbolResponse?.data && matchedSymbolResponse.data.length ? (
        <Chart symbol={matchedSymbolResponse.data[0]} resample={(resample as ResampleFrequency) ?? 'daily'} />
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default ChartSymbolPage;
