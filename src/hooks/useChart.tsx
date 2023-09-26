'use client';

import { ChartData, GetSymbolStockResponse, ResampleFrequency } from '@/interfaces/Dto/Stock';
import { MEMBERSHIP } from '@/interfaces/User';
import { TIMEOUT_CODE } from '@/service/axios';
import { getSymbolStock } from '@/service/stock';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import React from 'react';

type UseChartStatus = 'loading' | 'fetching' | 'success' | 'error' | 'timeout';

type ChartDataPayload = {
  membership: keyof typeof MEMBERSHIP | null;
  symbol: string | null;
  companyName: string | null;
  charts: ChartData[] | null;
  empty: boolean | null;
};

interface UseChartOption {
  symbolName: string;
  resample: ResampleFrequency;
  startDate: string;
  endDate: string;
  suspense?: boolean;
  useErrorBoundary?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

function useChart({
  symbolName,
  resample,
  startDate,
  endDate,
  suspense = false,
  useErrorBoundary = false,
  staleTime,
  cacheTime,
}: UseChartOption) {
  const queryClient = useQueryClient();

  const {
    data: chartDataResponse,
    status,
    error,
    isRefetching,
    refetch,
    isStale,
  } = useQuery(
    ['symbolChart', symbolName, resample],
    () =>
      getSymbolStock({
        symbol: symbolName,
        resampleFreq: resample,
        startDate,
        endDate,
      }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
      suspense,
      ...(staleTime && { staleTime }),
      ...(cacheTime && { cacheTime }),
      ...(useErrorBoundary && { useErrorBoundary: true }),
    },
  );

  // helper
  const getStatus: () => UseChartStatus = () => {
    if (status === 'loading') {
      return 'loading';
    }

    if (isRefetching) {
      return 'fetching';
    }

    if (status === 'error') {
      if (error instanceof AxiosError) {
        const { code } = error;

        if (code === TIMEOUT_CODE) {
          return 'timeout';
        }
      }

      return 'error';
    }

    if (status === 'success') {
      if (chartDataResponse.status !== HttpStatusCode.Ok) {
        return 'error';
      }

      return 'success';
    }

    return 'loading';
  };

  const getChartData: () => ChartDataPayload = () => {
    const initialChartData = {
      membership: null,
      symbol: null,
      companyName: null,
      charts: null,
      empty: null,
    } as ChartDataPayload;

    const status = getStatus();

    if (status === 'fetching') {
      return {
        membership: chartDataResponse?.data?.membership ?? null,
        symbol: chartDataResponse?.data?.symbol ?? null,
        companyName: chartDataResponse?.data?.companyName ?? null,
        charts: chartDataResponse?.data?.charts ?? null,
        empty: chartDataResponse?.data?.charts ? !chartDataResponse.data.charts : null,
      };
    }

    if (status !== 'success') {
      return initialChartData;
    }

    if (chartDataResponse?.data?.charts && !chartDataResponse.data.charts.length) {
      return {
        ...initialChartData,
        empty: true,
      };
    }

    return {
      membership: chartDataResponse!.data!.membership!,
      symbol: chartDataResponse?.data?.symbol ? chartDataResponse.data.symbol : null,
      companyName: chartDataResponse?.data?.companyName ? chartDataResponse.data.companyName : null,
      charts: chartDataResponse!.data!.charts!,
      empty: false,
    };
  };

  const getChartResult = () => {
    const { membership, symbol, companyName, charts, empty } = getChartData();

    return {
      symbolInfo: {
        symbolName: symbol,
        companyName,
      },
      membership,
      isNotPremium: membership && membership !== 'PREMIUM',
      charts,
      empty,
    };
  };

  const result = {
    ...getChartResult(),
    status: getStatus(),
    error,
    isStale,
    refetchChart: refetch,
    invalidateQuery: {
      chart() {
        return queryClient.invalidateQueries(['symbolChart', symbolName, resample]);
      },
    },
    removeQuery: {
      chart() {
        queryClient.removeQueries(['symbolChart', symbolName, resample]);
      },
    },
  };

  return result;
}

export default useChart;
