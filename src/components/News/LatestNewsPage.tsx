'use client';

import Link from 'next/link';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { ToastContainer } from 'react-toastify';
import { useNewsListFilter } from '@/redux/slice/newsListFilterSlice';
import { LatestNewsHeader, LatestNewsList, LatestNewsListLoading } from './LatestNews';
import { TrendNewsHeader } from './TrendNews';
import TrendNewsCard, { TrendNewsCardLoading } from './Card/TrendNewsCard';
import InfiniteTrigger from './InfiniteTrigger';
import LatestNewsTimeout from '../ErrorBoundary/ErrorFallback/LatestNews/Timeout';
import LatestNewsInternalServerError from '../ErrorBoundary/ErrorFallback/LatestNews/InternalServerError';
import { HorizontalLine } from '../UI/DivideLine';
import { latestNews } from '@/service/news';
import { TIMEOUT_CODE } from '@/service/axios';
import type { APIResponse } from '@/interfaces/Dto/Core';

function LatestNewsPage() {
  const queryClient = useQueryClient();

  const { filter } = useNewsListFilter();

  const {
    data: latestNewsPageResponse,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
    error,
  } = useInfiniteQuery(['news', 'latest'], ({ pageParam = 0 }) => latestNews({ page: pageParam }), {
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      const { data: LastPageResponse, status } = lastPage;

      const nextPage = LastPageResponse.data?.nextPage;

      return status === HttpStatusCode.Ok && nextPage ? nextPage : undefined;
    },
  });

  if (isSuccess && latestNewsPageResponse.pages[0].data.status !== HttpStatusCode.Ok) {
    return <LatestNewsInternalServerError refetch={refetch} />;
  }

  if (error) {
    if (error instanceof AxiosError) {
      const { code } = error as AxiosError<APIResponse>;

      if (code === TIMEOUT_CODE) {
        return <LatestNewsTimeout refetch={refetch} />;
      }

      return <LatestNewsInternalServerError refetch={refetch} />;
    }

    return <LatestNewsInternalServerError refetch={refetch} />;
  }

  return (
    <>
      <section className="mb-6 mt-[18px]">
        <TrendNewsHeader />
        {isLoading || isFetching || !latestNewsPageResponse?.pages[0]?.data.data?.news ? (
          <TrendNewsCardLoading />
        ) : (
          <Link
            href={`/detail/${latestNewsPageResponse?.pages[0].data.data?.news[0].newsId}${
              latestNewsPageResponse?.pages[0].data.data?.news[0].symbol
                ? `?symbol=${latestNewsPageResponse?.pages[0].data.data?.news[0].symbol.toUpperCase()}`
                : ''
            }`}
          >
            <TrendNewsCard news={latestNewsPageResponse?.pages[0].data.data?.news[0]} />
          </Link>
        )}
      </section>
      <HorizontalLine />
      <section className="mt-[18px]">
        <LatestNewsHeader />
        <div className={`${filter.view === 'box' ? 'space-y-4' : 'grid grid-cols-3 gap-5 pc:grid-cols-5'}`}>
          {isSuccess ? (
            <LatestNewsList
              newsList={latestNewsPageResponse.pages.flatMap((page, idx) => {
                const targetNewsList = page.data.data?.news;

                if (idx === 0) {
                  return targetNewsList?.slice(1) ?? [];
                }

                return targetNewsList ?? [];
              })}
              view={filter.view}
              onBookmark={() => {
                queryClient.invalidateQueries(['news', 'latest']);
              }}
            />
          ) : null}
          {isLoading || isFetchingNextPage || isFetching ? <LatestNewsListLoading view={filter.view} /> : null}
        </div>
      </section>
      {!isFetchingNextPage && hasNextPage ? (
        <InfiniteTrigger onTrigger={fetchNextPage} isFetching={isFetchingNextPage} hasNextPage={hasNextPage} />
      ) : null}
    </>
  );
}

export default LatestNewsPage;
