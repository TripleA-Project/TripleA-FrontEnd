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
import { TIMEOUT_CODE } from '@/service/axios';
import Button from '../Button/Button';
import { NotificationIcons } from '../Notification/NotificationIcons';
import { ServerErrorNotificationTemplate } from '@/constants/notification';

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
      const { code, response } = matchedSymbolError;

      if (response?.status === HttpStatusCode.Unauthorized) {
        redirect(`/login?continueURL=/chart/symbol?name=${symbolName}&resample=${resample ?? 'daily'}`);
      }

      if (code === TIMEOUT_CODE) {
        return (
          <div
            className="flex h-[70vh] flex-col items-center justify-center text-center"
            style={{
              fontFamily:
                'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
            }}
          >
            <div className="bg-white p-4">
              <div className="mb-4 flex flex-col items-center">
                <NotificationIcons.Error className="mb-2 text-4xl" />
                <h3 className="mb-4 text-2xl font-bold text-[#FD954A]">
                  {ServerErrorNotificationTemplate.Timeout.title}
                </h3>
                {ServerErrorNotificationTemplate.Timeout.content
                  .trim()
                  .split('\n')
                  .map((text) => {
                    return (
                      <p key={text} className="text-[#4E525D]">
                        {text}
                      </p>
                    );
                  })}
                <Button
                  bgColorTheme="orange"
                  textColorTheme="white"
                  fullWidth
                  className="mt-4"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  새로고침
                </Button>
              </div>
            </div>
          </div>
        );
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
