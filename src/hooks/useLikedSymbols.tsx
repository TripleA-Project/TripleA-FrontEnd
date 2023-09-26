'use client';

import { ReactQueryHashKeys } from '@/constants/queryHashKeys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { TIMEOUT_CODE } from '@/service/axios';
import { getLikeSymbol } from '@/service/symbol';
import type { Symbol } from '@/interfaces/Symbol';
import type { APIResponse } from '@/interfaces/Dto/Core';

type UseLikedSymbolsStatus = 'loading' | 'fetching' | 'success' | 'error' | 'timeout';

interface UseLikedSymbolsOption {
  suspense?: boolean;
  useErrorBoundary?: boolean;
}

interface LikedSymbols {
  symbols: Symbol[] | null;
  empty: boolean | null;
}

export const useLikedSymbols = (
  { suspense, useErrorBoundary }: UseLikedSymbolsOption = { suspense: false, useErrorBoundary: false },
) => {
  const queryClient = useQueryClient();

  const {
    data: likedSymbolResponse,
    status,
    refetch,
    isRefetching,
    error,
  } = useQuery(ReactQueryHashKeys.getLikedSymbols, () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
    suspense,
    ...(useErrorBoundary && { useErrorBoundary: true }),
  });

  // helper
  const getStaus: () => UseLikedSymbolsStatus = () => {
    if (status === 'loading') {
      return 'loading';
    }

    if (isRefetching) {
      return 'fetching';
    }

    if (status === 'success') {
      if (likedSymbolResponse.status === HttpStatusCode.Unauthorized) {
        return 'error';
      }

      if (likedSymbolResponse.data && !Array.isArray(likedSymbolResponse.data)) {
        return 'error';
      }

      return 'success';
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

    return 'loading';
  };

  const getLikedSymbols: () => LikedSymbols = () => {
    const initialLikedSymbols = {
      symbols: null,
      empty: null,
    } as LikedSymbols;

    const status = getStaus();

    if (status === 'fetching') {
      return {
        symbols: likedSymbolResponse?.data ?? null,
        empty: likedSymbolResponse?.data ? !likedSymbolResponse.data.length : null,
      };
    }

    if (status !== 'success') return initialLikedSymbols;

    if (likedSymbolResponse?.data && !likedSymbolResponse.data.length) {
      return {
        ...initialLikedSymbols,
        empty: true,
      };
    }

    return {
      symbols: likedSymbolResponse!.data!,
      empty: false,
    };
  };

  const getLoginRequired: () => { loginRequired: boolean } = () => {
    if (status === 'error') {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>;

        if (response?.data.status === HttpStatusCode.Unauthorized) {
          return { loginRequired: true };
        }
      }
    }

    if (likedSymbolResponse?.status === HttpStatusCode.Unauthorized) {
      return { loginRequired: true };
    }

    return { loginRequired: false };
  };

  const likedSymbolResult = {
    likedSymbols: { ...getLikedSymbols() } as LikedSymbols,
  };

  // result
  const results = {
    ...likedSymbolResult,
    ...getLoginRequired(),
    status: getStaus(),
    isFetching: isRefetching,
    refetchLikedSymbols: refetch,
    invalidateQuery: {
      likedSymbols() {
        return queryClient.invalidateQueries(ReactQueryHashKeys.getLikedSymbols);
      },
    },
    removeQuery: {
      likedSymbols() {
        queryClient.removeQueries(ReactQueryHashKeys.getLikedSymbols);
      },
    },
  };

  return results;
};
