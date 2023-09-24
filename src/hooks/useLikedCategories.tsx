'use client';

import { useQueries, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { ReactQueryHashKeys } from '@/constants/queryHashKeys';
import { TIMEOUT_CODE } from '@/service/axios';
import { getAllCategory, getLikeCategory } from '@/service/category';
import type { APIResponse } from '@/interfaces/Dto/Core';
import type { GetAllCategoryResponse, GetLikeCategoryResponse } from '@/interfaces/Dto/Category';
import type { Category } from '@/interfaces/Category';

type UseLikedCategoriesStatus = 'loading' | 'fetching' | 'success' | 'error' | 'timeout';

interface UseLikedCategoriesOption {
  suspense?: boolean;
  useErrorBoundary?: boolean;
}

interface LikedCategories {
  categories: Category[] | null;
  allCategories: Category[] | null;
  empty: boolean | null;
}

export const useLikedCategories = (
  { suspense, useErrorBoundary }: UseLikedCategoriesOption = { suspense: false, useErrorBoundary: false },
) => {
  const queryClient = useQueryClient();

  const [
    {
      data: allCategoriesResponse,
      status: allCategoriesStatus,
      refetch: allCategoriesRefetch,
      isRefetching: isAllCategoriesFetching,
      error: allCategoriesError,
    },
    {
      data: likedCategoriesResponse,
      status: likedCategoriesStatus,
      refetch: likedCategoriesRefetch,
      isRefetching: isLikedCategoriesFetching,
      error: likedCategoriesError,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ReactQueryHashKeys.getAllCategories,
        queryFn: () => getAllCategory(),
        retry: 0,
        refetchOnWindowFocus: false,
        select(response: AxiosResponse<GetAllCategoryResponse>) {
          return response.data;
        },
        suspense,
        ...(useErrorBoundary && { useErrorBoundary: true }),
      },
      {
        queryKey: ReactQueryHashKeys.getLikedCategories,
        queryFn: () => getLikeCategory(),
        retry: 0,
        refetchOnWindowFocus: false,
        select(response: AxiosResponse<GetLikeCategoryResponse>) {
          return response.data;
        },
        suspense,
        ...(useErrorBoundary && { useErrorBoundary: true }),
      },
    ],
  });

  // helper
  const getStaus: () => UseLikedCategoriesStatus = () => {
    if (allCategoriesStatus === 'loading' || likedCategoriesStatus === 'loading') {
      return 'loading';
    }

    if (isAllCategoriesFetching || isLikedCategoriesFetching) {
      return 'fetching';
    }

    if (allCategoriesStatus === 'error' || likedCategoriesStatus === 'error') {
      if (allCategoriesError instanceof AxiosError) {
        const { code } = allCategoriesError;

        if (code === TIMEOUT_CODE) {
          return 'timeout';
        }

        return 'error';
      }

      if (likedCategoriesError instanceof AxiosError) {
        const { code } = likedCategoriesError;

        if (code === TIMEOUT_CODE) {
          return 'timeout';
        }

        return 'error';
      }

      return 'error';
    }

    if (allCategoriesStatus === 'success' || likedCategoriesStatus === 'success') {
      if (
        allCategoriesResponse?.status === HttpStatusCode.Unauthorized ||
        likedCategoriesResponse?.status === HttpStatusCode.Unauthorized
      ) {
        return 'error';
      }

      if (allCategoriesResponse?.data && !Array.isArray(allCategoriesResponse.data)) {
        return 'error';
      }

      if (likedCategoriesResponse?.data && !Array.isArray(likedCategoriesResponse.data)) {
        return 'error';
      }
    }

    if (allCategoriesStatus === 'success' && likedCategoriesStatus === 'success') {
      return 'success';
    }

    return 'loading';
  };

  const getLikedCategories: () => LikedCategories = () => {
    const initialLikedCategories = {
      allCategories: null,
      categories: null,
      empty: null,
    } as LikedCategories;

    const status = getStaus();

    if (status === 'fetching') {
      return {
        allCategories: allCategoriesResponse?.data ?? null,
        categories: likedCategoriesResponse?.data ?? null,
        empty: likedCategoriesResponse?.data ? !likedCategoriesResponse.data.length : null,
      };
    }

    if (status !== 'success') return initialLikedCategories;

    const resultCategories = {
      ...initialLikedCategories,
    } as LikedCategories;

    if (allCategoriesResponse) {
      resultCategories.allCategories = allCategoriesResponse?.data?.length ? allCategoriesResponse.data : null;
    }

    if (likedCategoriesResponse) {
      resultCategories.categories = likedCategoriesResponse.data!;
      resultCategories.empty = false;

      if (likedCategoriesResponse?.data && !likedCategoriesResponse.data.length) {
        resultCategories.categories = null;
        resultCategories.empty = true;
      }
    }

    return resultCategories;
  };

  const getLoginRequired: () => { loginRequired: boolean } = () => {
    if (allCategoriesStatus === 'error' || likedCategoriesStatus === 'error') {
      if (allCategoriesError instanceof AxiosError) {
        const { response } = allCategoriesError as AxiosError<APIResponse>;

        if (response?.data.status === HttpStatusCode.Unauthorized) {
          return { loginRequired: true };
        }
      }

      if (likedCategoriesError instanceof AxiosError) {
        const { response } = likedCategoriesError as AxiosError<APIResponse>;

        if (response?.data.status === HttpStatusCode.Unauthorized) {
          return { loginRequired: true };
        }
      }
    }

    return { loginRequired: false };
  };

  const likedCategoriesResult = {
    likedCategories: { ...getLikedCategories() },
  };

  // result
  const results = {
    ...likedCategoriesResult,
    ...getLoginRequired(),
    status: getStaus(),
    isFetching: isAllCategoriesFetching || isLikedCategoriesFetching,
    refetch: {
      allCategories: allCategoriesRefetch,
      likedCategories: likedCategoriesRefetch,
    },
    invalidateQuery: {
      allCategories() {
        return queryClient.invalidateQueries(ReactQueryHashKeys.getAllCategories);
      },
      likedCategories() {
        return queryClient.invalidateQueries(ReactQueryHashKeys.getLikedCategories);
      },
      all() {
        return async () => {
          queryClient.invalidateQueries(ReactQueryHashKeys.getAllCategories);
          queryClient.invalidateQueries(ReactQueryHashKeys.getLikedCategories);
        };
      },
    },
    removeQuery: {
      allCategories() {
        queryClient.removeQueries(ReactQueryHashKeys.getAllCategories);
      },
      likedCategories() {
        queryClient.removeQueries(ReactQueryHashKeys.getLikedCategories);
      },
      all() {
        queryClient.removeQueries(ReactQueryHashKeys.getAllCategories);
        queryClient.removeQueries(ReactQueryHashKeys.getLikedCategories);
      },
    },
  };

  return results;
};
