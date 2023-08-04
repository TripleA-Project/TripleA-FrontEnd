'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { getAllCategory, getLikeCategory } from '@/service/category';
import { getLikeSymbol } from '@/service/symbol';
import { type Category } from '@/interfaces/Category';
import { type Symbol } from '@/interfaces/Symbol';

interface LikedSymbols {
  symbols: Symbol[];
  indexes: { name: string; index: number }[];
}

interface LikedCategories {
  inAllCategory: Category[];
  inLikeCategory: Category[];
}

interface UseLikesResult {
  likedSymbols: LikedSymbols | null;
  likedCatgories: LikedCategories | null;
  empty: boolean;
  loginRequired: boolean;
  status: 'loading' | 'success' | 'error';
}

export const useLikes = () => {
  const [result, setResult] = useState<UseLikesResult>({
    likedSymbols: null,
    likedCatgories: null,
    empty: false,
    loginRequired: false,
    status: 'loading',
  });

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
  } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  useEffect(() => {
    if (allCategoriesStatus === 'loading' || likedCategoryStatus === 'loading' || likedSymbolStatus === 'loading') {
      if (result.status !== 'loading') {
        setResult((prev) => ({
          ...prev,
          status: 'loading',
        }));
      }

      return;
    }

    if (allCategoriesStatus === 'error' || likedCategoryStatus === 'error' || likedSymbolStatus === 'error') {
      if (
        isAxiosError<typeof likedCategory>(likedCategoryError) &&
        isAxiosError<typeof likedSymbol>(likedSymbolError)
      ) {
        if (
          likedCategoryError.response?.data?.status === HttpStatusCode.Unauthorized ||
          likedSymbolError.response?.data?.status === HttpStatusCode.Unauthorized
        ) {
          setResult((prev) => ({
            ...prev,
            status: 'error',
            loginRequired: true,
          }));
        }

        return;
      }

      setResult((prev) => ({
        ...prev,
        status: 'error',
      }));

      return;
    }

    if (likedCategory.status === HttpStatusCode.Unauthorized || likedSymbol.status === HttpStatusCode.Unauthorized) {
      setResult((prev) => ({
        ...prev,
        status: 'error',
        loginRequired: true,
      }));

      return;
    }

    if (!likedCategory.data?.length && !likedSymbol.data?.length) {
      setResult((prev) => ({
        ...prev,
        status: 'success',
        likedSymbols: null,
        likedCatgories: null,
        empty: true,
        loginRequired: false,
      }));

      return;
    }

    const inAllCategory = allCategories.data!.filter((allCategoryItem) =>
      likedCategory.data?.find((likedCategory) => likedCategory.category === allCategoryItem.category),
    );
    const inLikeCategory = likedCategory.data as Category[];

    const symbols = likedSymbol.data as Symbol[];
    const symbolIndexes = likedSymbol.data?.map((likedSymbol) => {
      return {
        name: likedSymbol.symbol.toUpperCase(),
        index: likedSymbol.symbolId,
      };
    });

    setResult((prev) => ({
      ...prev,
      likedCatgories: likedCategory.data?.length ? { inAllCategory, inLikeCategory } : null,
      likedSymbols: likedSymbol.data?.length ? { symbols, indexes: symbolIndexes! } : null,
      status: 'success',
      empty: false,
      loginRequired: false,
    }));
  }, [allCategoriesStatus, likedCategoryStatus, likedSymbolStatus]); /* eslint-disable-line */

  return result;
};
