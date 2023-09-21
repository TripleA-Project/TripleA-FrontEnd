'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { getAllCategory, getLikeCategory } from '@/service/category';
import { TIMEOUT_CODE } from '@/service/axios';
import { getLikeSymbol } from '@/service/symbol';
import type { Symbol } from '@/interfaces/Symbol';
import type { Category } from '@/interfaces/Category';
import type { APIResponse } from '@/interfaces/Dto/Core';

type UseLikesStatus = 'loading' | 'success' | 'error' | 'timeout';

interface LikedSymbols {
  symbols: Symbol[] | null;
  indexes: { name: string; index: number }[] | null;
  empty: boolean | null;
}

interface LikedCategories {
  categories: Category[] | null;
  allCategories: Category[] | null;
  empty: boolean | null;
}

export const useLikes = () => {
  const queryClient = useQueryClient();

  // useQuery
  const { data: allCategories, status: allCategoriesStatus } = useQuery(['allCategories'], () => getAllCategory(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
    cacheTime: Infinity,
  });

  const {
    data: likedCategory,
    status: likedCategoryStatus,
    error: likedCategoryError,
    isRefetching: isLikedCategoryFetching,
  } = useQuery(['likedCategoryList'], () => getLikeCategory(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const {
    data: likedSymbol,
    status: likedSymbolStatus,
    error: likedSymbolError,
    isRefetching: isLikedSymbolFetching,
  } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  // helper
  const getStatus: () => UseLikesStatus = () => {
    if (allCategoriesStatus === 'loading' || likedCategoryStatus === 'loading' || likedSymbolStatus === 'loading')
      return 'loading';

    if (allCategoriesStatus === 'success' && likedCategoryStatus === 'success' && likedSymbolStatus === 'success') {
      if (
        allCategories.status === HttpStatusCode.Unauthorized ||
        likedCategory.status === HttpStatusCode.Unauthorized ||
        likedSymbol.status === HttpStatusCode.Unauthorized
      )
        return 'error';

      return 'success';
    }

    if (likedSymbolStatus === 'error' || likedCategoryStatus === 'error') {
      if (likedSymbolError instanceof AxiosError) {
        const { code } = likedSymbolError as AxiosError;

        if (code === TIMEOUT_CODE) return 'timeout';

        return 'error';
      }

      if (likedCategoryError instanceof AxiosError) {
        const { code } = likedCategoryError as AxiosError;

        if (code === TIMEOUT_CODE) return 'timeout';

        return 'error';
      }

      return 'error';
    }

    return 'loading';
  };

  const getLikedSymbols: () => LikedSymbols = () => {
    const initialLikedSymbols = {
      symbols: null,
      indexes: null,
      empty: null,
    } as LikedSymbols;

    if (likedSymbolStatus !== 'success') return initialLikedSymbols;

    if (likedSymbol) {
      if (likedSymbol.status === HttpStatusCode.Unauthorized) return initialLikedSymbols;
      if (!likedSymbol?.data) return initialLikedSymbols;
      if (!likedSymbol.data?.length)
        return {
          ...initialLikedSymbols,
          empty: true,
        };

      const symbolIndexes = likedSymbol.data.map((likedSymbol) => {
        return {
          name: likedSymbol.symbol.toUpperCase(),
          index: likedSymbol.symbolId,
        };
      });

      return {
        symbols: likedSymbol.data,
        indexes: symbolIndexes,
        empty: false,
      };
    }

    return initialLikedSymbols;
  };

  const getCategories: () => LikedCategories = () => {
    const initialLikedCategories = {
      allCategories: null,
      categories: null,
      empty: null,
    } as LikedCategories;

    if (allCategoriesStatus !== 'success' || likedCategoryStatus !== 'success') return initialLikedCategories;

    if (allCategories && likedCategory) {
      if (allCategories.status === HttpStatusCode.Unauthorized || likedCategory.status === HttpStatusCode.Unauthorized)
        return initialLikedCategories;

      const allCategoriesData = allCategories.data?.length ? allCategories.data : null;
      const likedCategoryData = likedCategory.data?.length ? likedCategory.data : null;

      return {
        allCategories: allCategoriesData,
        categories: likedCategoryData,
        empty: !likedCategory.data?.length,
      };
    }

    return initialLikedCategories;
  };

  const likedSymbolResult = {
    likedSymbols: { ...getLikedSymbols() } as LikedSymbols,
  };

  const categoryResult = {
    likedCategories: { ...getCategories() },
  };

  const getLoginRequired: () => { loginRequired: boolean } = () => {
    if (likedCategoryStatus !== 'error' || likedSymbolStatus !== 'error') {
      if (likedCategory?.status === HttpStatusCode.Unauthorized || likedSymbol?.status === HttpStatusCode.Unauthorized)
        return {
          loginRequired: true,
        };

      return {
        loginRequired: false,
      };
    }

    if (likedSymbolError instanceof AxiosError) {
      const { response } = likedSymbolError as AxiosError<APIResponse>;

      if (response?.data.status === HttpStatusCode.Unauthorized)
        return {
          loginRequired: true,
        };
    }

    if (likedCategoryError instanceof AxiosError) {
      const { response } = likedCategoryError as AxiosError<APIResponse>;

      if (response?.data.status === HttpStatusCode.Unauthorized)
        return {
          loginRequired: true,
        };
    }

    return {
      loginRequired: false,
    };
  };

  // result
  const results = {
    ...likedSymbolResult,
    ...categoryResult,
    ...getLoginRequired(),
    status: getStatus(),
    isFetching: isLikedSymbolFetching || isLikedCategoryFetching,
    invalidateQuery: {
      likedSymbol() {
        return queryClient.invalidateQueries(['likedSymbolList']);
      },
      likedCategory() {
        return queryClient.invalidateQueries(['likedCategoryList']);
      },
    },
    removeQuery: {
      likedSymbol() {
        queryClient.removeQueries(['likedSymbolList']);
      },
      likedCategory() {
        queryClient.removeQueries(['likedCategoryList']);
      },
    },
  };

  return results;
};
