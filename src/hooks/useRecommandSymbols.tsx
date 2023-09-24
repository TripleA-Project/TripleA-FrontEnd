'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { ReactQueryHashKeys } from '@/constants/queryHashKeys';
import { TIMEOUT_CODE } from '@/service/axios';
import { getRecommandSymbol } from '@/service/symbol';
import type { Symbol } from '@/interfaces/Symbol';

type UseRecommandSymbolsStatus = 'loading' | 'fetching' | 'success' | 'error' | 'timeout';

interface UseRecommandSymbolsOption {
  suspense?: boolean;
  useErrorBoundary?: boolean;
}

interface RecommandSymbols {
  symbols: Symbol[] | null;
  empty: boolean | null;
}

function useRecommandSymbols(
  { suspense, useErrorBoundary }: UseRecommandSymbolsOption = { suspense: false, useErrorBoundary: false },
) {
  const queryClient = useQueryClient();

  const {
    data: recommandSymbolsResponse,
    status,
    isRefetching,
    refetch,
    error,
  } = useQuery(ReactQueryHashKeys.getRecommandSymbols, () => getRecommandSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
    suspense,
    ...(useErrorBoundary && { useErrorBoundary: true }),
  });

  // helper
  const getStatus: () => UseRecommandSymbolsStatus = () => {
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
      if (recommandSymbolsResponse.status === HttpStatusCode.Unauthorized) {
        return 'error';
      }

      if (recommandSymbolsResponse.data && !Array.isArray(recommandSymbolsResponse.data)) {
        return 'error';
      }

      return 'success';
    }

    return 'loading';
  };

  const getRecommandSymbols: () => RecommandSymbols = () => {
    const initialRecommandSymbols = {
      symbols: null,
      empty: null,
    } as RecommandSymbols;

    const status = getStatus();

    if (status === 'fetching') {
      return {
        symbols: recommandSymbolsResponse?.data ?? null,
        empty: recommandSymbolsResponse?.data ? !recommandSymbolsResponse.data.length : null,
      };
    }

    if (status !== 'success') {
      return initialRecommandSymbols;
    }

    if (recommandSymbolsResponse?.data && !recommandSymbolsResponse.data.length) {
      return {
        ...initialRecommandSymbols,
        empty: true,
      };
    }

    return {
      symbols: recommandSymbolsResponse!.data!,
      empty: false,
    };
  };

  const recommandSymbolsResult = {
    recommandSymbols: { ...getRecommandSymbols() } as RecommandSymbols,
  };

  // results
  const results = {
    ...recommandSymbolsResult,
    status: getStatus(),
    isFetching: isRefetching,
    refetchRecommandSymbols: refetch,
    invalidateQuery: {
      recommandSymbols() {
        return queryClient.invalidateQueries(ReactQueryHashKeys.getRecommandSymbols);
      },
    },
    removeQuery: {
      recommandSymbols() {
        queryClient.removeQueries(ReactQueryHashKeys.getRecommandSymbols);
      },
    },
  };

  return results;
}

export default useRecommandSymbols;
