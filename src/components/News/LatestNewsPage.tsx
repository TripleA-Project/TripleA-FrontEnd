'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';
import { useNewsListFilter } from '@/redux/slice/newsListFilterSlice';
import { LatestNewsHeader, LatestNewsList, LatestNewsListLoading } from './LatestNews';
import { TrendNewsHeader } from './TrendNews';
import TrendNewsCard, { TrendNewsCardError, TrendNewsCardLoading } from './Card/TrendNewsCard';
import InfiniteTrigger from './InfiniteTrigger';
import { latestNews } from '@/service/news';
import { TIMEOUT_CODE } from '@/service/axios';

function LatestNewsPage() {
  const { filter } = useNewsListFilter();

  const {
    data: latestNewsPageResponse,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery(['news', 'latest'], ({ pageParam = 0 }) => latestNews({ page: pageParam }), {
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      const { data: LastPageResponse, status } = lastPage;

      const nextPage = LastPageResponse.data?.nextPage;

      return status === 200 && nextPage ? nextPage : undefined;
    },
  });

  const isTimeoutError = error && isAxiosError(error) && error.code === TIMEOUT_CODE;

  if (isSuccess && latestNewsPageResponse.pages[0].data.status !== HttpStatusCode.Ok) {
    redirect('/login');
  }

  return (
    <>
      <section className="mb-6 mt-[18px]">
        <TrendNewsHeader />
        {isTimeoutError ? (
          <TrendNewsCardError message={error.message} />
        ) : isLoading || !latestNewsPageResponse?.pages[0]?.data.data?.news ? (
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
      <hr className="-mx-4 h-2 border-none bg-[#F5F7F9]" />
      <section className="mt-[18px]">
        <LatestNewsHeader />
        <div className={`${filter.view === 'box' ? 'space-y-4' : 'grid grid-cols-3 gap-5 pc:grid-cols-5'}`}>
          {isLoading ? <LatestNewsListLoading view={filter.view} /> : null}
          {isSuccess
            ? latestNewsPageResponse.pages.map((response, idx) => {
                return (
                  <LatestNewsList
                    key={`${Date.now()}-${response.data.data?.nextPage}`}
                    newsList={response.data.data?.news ? response.data.data.news.slice(idx === 0 ? 1 : 0) : []}
                    view={filter.view}
                  />
                );
              })
            : null}
          {isFetchingNextPage && hasNextPage ? <LatestNewsListLoading view={filter.view} /> : null}
        </div>
      </section>
      {!isFetchingNextPage && hasNextPage ? (
        <InfiniteTrigger onTrigger={fetchNextPage} isFetching={isFetchingNextPage} hasNextPage={hasNextPage} />
      ) : null}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default LatestNewsPage;