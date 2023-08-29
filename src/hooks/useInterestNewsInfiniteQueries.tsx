'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import { searchCategoryNews, searchSymbolNews } from '@/service/news';
import { NewsData } from '@/interfaces/NewsData';
import { getAllCategory, getLikeCategory } from '@/service/category';
import { getLikeSymbol } from '@/service/symbol';
import { HttpStatusCode } from 'axios';

interface CategoryType {
  type: 'category';
  categoryId: number;
}

interface SymbolType {
  type: 'symbol';
  name: string;
}

type InterestType = CategoryType | SymbolType;

type PagePayload = InterestType & {
  news?: NewsData[];
};

type NextPagePayload = InterestType & {
  nextPage?: number;
};

interface InterestQueryHookPayload {
  pages: Array<PagePayload[]>;
  nextPages: NextPagePayload[];
  hasNextPage: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  loginRequired: boolean;
}

interface InterestQueryHookResult extends Omit<InterestQueryHookPayload, 'nextPages' | 'status'> {
  queriesStatus: InterestQueryHookPayload['status'];
  fetchNextPage: () => Promise<void>;
}

export const useInterestNewsInfiniteQueries: () => InterestQueryHookResult = () => {
  const { data: allCategories, status: allCategoriesStatus } = useQuery(['allCategories'], () => getAllCategory(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
    cacheTime: Infinity,
  });

  const { data: likedCategory, status: likedCategoryStatus } = useQuery(
    ['likedCategoryList'],
    () => getLikeCategory(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  const { data: likedSymbol, status: likedSymbolStatus } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const [queryPayload, setQueryPayload] = useState<InterestQueryHookPayload>({
    pages: [],
    nextPages: [],
    hasNextPage: true,
    status: 'idle',
    loginRequired: false,
  });
  const [isFetch, setIsFetch] = useState(true);
  const fetchNextPage = useCallback(async () => {
    setIsFetch(true);
  }, []);

  const fetchQueries = getFetchQueries(queryPayload);

  const newsQueries = useQueries({
    queries:
      fetchQueries?.length && isFetch
        ? fetchQueries.map((query) => {
            return {
              queryKey: [
                'news',
                query.type,
                query.type === 'category' ? query.categoryId : query.name.toUpperCase(),
                query.nextPage,
              ],
              queryFn:
                query.type === 'category'
                  ? () => searchCategoryNews({ categoryId: query.categoryId, page: query.nextPage! })
                  : () => searchSymbolNews({ symbol: query.name.toUpperCase(), page: query.nextPage! }),
              retry: 0,
              refetchOnWindowFocus: false,
            };
          })
        : [],
  });

  const getStatus = () => {
    if (!isFetch) return queryPayload.status;

    if (!newsQueries?.length) return 'idle';
    if (newsQueries.some((query) => query.status === 'error')) return 'error';
    if (newsQueries.some((query) => query.status === 'loading')) return 'loading';
    if (newsQueries.every((query) => query.status === 'success')) return 'success';

    return 'idle';
  };

  const queriesStatus = getStatus();

  function getFetchQueries(payload: InterestQueryHookPayload) {
    const fetchQueries = payload?.nextPages?.filter((query) => Number.isInteger(query.nextPage));

    return fetchQueries && fetchQueries.length ? fetchQueries : [];
  }

  useEffect(() => {
    if (likedCategoryStatus === 'loading' || likedSymbolStatus === 'loading' || allCategoriesStatus === 'loading')
      return;
    if (likedCategoryStatus === 'error' || likedSymbolStatus === 'error' || allCategoriesStatus === 'error') {
      if (
        likedCategory?.status === HttpStatusCode.Unauthorized ||
        likedSymbol?.status !== HttpStatusCode.Unauthorized ||
        allCategories?.status !== HttpStatusCode.Unauthorized
      ) {
        setQueryPayload((prev) => ({
          ...prev,
          hasNextPage: false,
          loginRequired: true,
          status: 'error',
        }));
      }

      return;
    }

    if (
      likedCategory.status === HttpStatusCode.Unauthorized ||
      likedSymbol.status === HttpStatusCode.Unauthorized ||
      allCategories.status === HttpStatusCode.Unauthorized
    ) {
      setQueryPayload((prev) => ({
        ...prev,
        hasNextPage: false,
        loginRequired: true,
        status: 'error',
      }));

      return;
    }

    if (!queryPayload.nextPages?.length) {
      const categoryNextPages = likedCategory.data
        ? likedCategory.data.map((category) => {
            return {
              type: 'category',
              categoryId: allCategories.data!.find((allCategoryItem) => allCategoryItem.category === category.category)!
                .categoryId,
              nextPage: 0,
            } as NextPagePayload;
          })
        : [];

      const symbolNextPages = likedSymbol.data
        ? likedSymbol.data.map((symbol) => {
            return {
              type: 'symbol',
              name: symbol.symbol.toUpperCase(),
              nextPage: 0,
            } as NextPagePayload;
          })
        : [];

      setQueryPayload((prev) => ({
        ...prev,
        loginRequired: false,
        nextPages: [...cloneDeep(categoryNextPages), ...cloneDeep(symbolNextPages)],
      }));
    }
  }, [likedCategoryStatus, likedSymbolStatus, allCategoriesStatus]); /* eslint-disable-line */

  useEffect(() => {
    if (queriesStatus !== 'success') {
      if (queryPayload.status !== queriesStatus) {
        setQueryPayload((prev) => ({
          ...prev,
          status: queriesStatus,
        }));
      }

      return;
    }

    if (!newsQueries?.length) return;

    const newsPayload: PagePayload[] = [];
    const nextPagePayload: NextPagePayload[] = [];
    let hasNextPage = false;

    for (let i = 0; i < fetchQueries.length; i++) {
      const fetchQuery = fetchQueries[i];
      const newsQuery = newsQueries[i];
      const queryPayload = newsQuery.data?.data.data;

      if (queryPayload) {
        const { news, nextPage } = queryPayload;

        if (nextPage) {
          hasNextPage = true;
        }

        if (fetchQuery.type === 'category') {
          newsPayload.push({
            type: 'category',
            categoryId: fetchQuery.categoryId,
            news,
          });
          nextPagePayload.push({
            type: 'category',
            categoryId: fetchQuery.categoryId,
            nextPage: nextPage ? nextPage : undefined,
          });
        }

        if (fetchQuery.type === 'symbol') {
          newsPayload.push({
            type: 'symbol',
            name: fetchQuery.name.toUpperCase(),
            news,
          });
          nextPagePayload.push({
            type: 'symbol',
            name: fetchQuery.name.toUpperCase(),
            nextPage: nextPage ? nextPage : undefined,
          });
        }
      }
    }

    setQueryPayload((prev) => ({
      ...prev,
      pages: [...cloneDeep(prev.pages), newsPayload],
      nextPages: [...nextPagePayload],
      hasNextPage,
      status: 'success',
    }));

    setIsFetch(false);
  }, [queriesStatus]); /* eslint-disable-line */

  return {
    pages: queryPayload.pages,
    hasNextPage: queryPayload.hasNextPage,
    queriesStatus: queryPayload.status,
    loginRequired: queryPayload.loginRequired,
    fetchNextPage,
  };
};
