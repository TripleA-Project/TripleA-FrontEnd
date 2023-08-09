'use client';

import React, { useRef, useState } from 'react';
import { HttpStatusCode, isAxiosError } from 'axios';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { MdApps, MdOutlineArrowBackIosNew, MdTableRows } from 'react-icons/md';
import NewsList, { NewsListLoading } from '../NewsList';
import NewsGridList, { NewsGridListLoading } from '../NewsList/NewsGridList';
import { searchCategoryNews, searchSymbolNews } from '@/service/news';
import { type Category } from '@/interfaces/Category';
import { type Symbol } from '@/interfaces/Symbol';
import { IoMdRefresh } from 'react-icons/io';

interface InfinityFetcherProps {
  category?: Category;
  symbol?: Symbol;
}

interface InfinityNewsListProps extends InfinityFetcherProps {}

export function genLinkHashId({ category, symbol }: { category?: Category; symbol?: Symbol }) {
  const type = category ? 'category' : symbol ? 'symbol' : 'unknown';
  const subId = category ? category.categoryId : symbol?.symbol.toUpperCase();

  return `interest-${type}-${subId}`;
}

function InfinityNewsList({ category, symbol }: InfinityNewsListProps) {
  const queryClient = useQueryClient();

  const {
    data: NewsPageResponse,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery(
    ['news', category ? 'category' : 'symbol', category ? category.category : symbol?.symbol.toUpperCase()],
    ({ pageParam = 0 }) =>
      symbol
        ? searchSymbolNews({ symbol: symbol.symbol.toUpperCase(), page: pageParam })
        : searchCategoryNews({ categoryId: category!.categoryId, page: pageParam }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const { data: LastPageResponse, status } = lastPage;

        const nextPage = LastPageResponse.data?.nextPage;

        return status === HttpStatusCode.Ok && nextPage ? nextPage : undefined;
      },
    },
  );

  const newsListWrapperRef = useRef<HTMLDivElement>(null);

  const [viewFilter, setViewFilter] = useState<'box' | 'grid'>('box');

  return (
    <div ref={newsListWrapperRef} id={genLinkHashId({ category, symbol })}>
      <section className="sticky top-[140.5px] z-[4] my-4 flex items-center justify-between bg-white">
        <h2 className="text-lg font-bold">{category ? category.category : symbol?.symbol.toUpperCase()} 관련 뉴스</h2>
        <div className="flex gap-1.5">
          <MdTableRows
            role="button"
            className={`${viewFilter === 'box' ? 'text-[#4E525D]' : 'text-[#E5E7EC]'} text-2xl`}
            onClick={() => {
              const linkWrapper = document.getElementById('link_wrapper');

              setViewFilter('box');

              if (!linkWrapper) return;

              window?.scrollTo({
                top: newsListWrapperRef.current!.offsetTop - linkWrapper!.offsetHeight - 114,
                behavior: 'smooth',
              });
            }}
          />
          <MdApps
            role="button"
            className={`${viewFilter === 'grid' ? 'text-[#4E525D]' : 'text-[#E5E7EC]'} text-2xl`}
            onClick={() => {
              const linkWrapper = document.getElementById('link_wrapper');

              setViewFilter('grid');

              if (!linkWrapper) return;

              window?.scrollTo({
                top: newsListWrapperRef.current!.offsetTop - linkWrapper!.offsetHeight - 114,
                behavior: 'smooth',
              });
            }}
          />
        </div>
      </section>
      <div className={`${viewFilter === 'grid' ? 'grid grid-cols-3 gap-5 pc:grid-cols-5' : ''}`}>
        {isLoading ? viewFilter == 'box' ? <NewsListLoading length={5} /> : <NewsGridListLoading /> : null}
        {error ? (
          <div className="flex items-center gap-1">
            데이터를 가져올 수 없습니다{' '}
            <button onClick={() => refetch()}>
              <IoMdRefresh />
            </button>
          </div>
        ) : null}
        {isSuccess ? (
          NewsPageResponse.pages[0].data.data?.news?.length ? (
            viewFilter === 'box' ? (
              <NewsList
                newsList={NewsPageResponse.pages.flatMap((pageResponse) =>
                  pageResponse.data.data?.news?.length ? pageResponse.data.data.news : [],
                )}
                onBookmark={() =>
                  queryClient.invalidateQueries([
                    'news',
                    category ? 'category' : 'symbol',
                    category ? category.category : symbol?.symbol.toUpperCase(),
                  ])
                }
              />
            ) : (
              <NewsGridList
                newsList={NewsPageResponse.pages.flatMap((pageResponse) =>
                  pageResponse.data.data?.news?.length ? pageResponse.data.data.news : [],
                )}
              />
            )
          ) : (
            <div>관련 뉴스가 없습니다</div>
          )
        ) : null}
        {(isLoading || isFetchingNextPage) && hasNextPage ? (
          viewFilter == 'box' ? (
            <NewsListLoading />
          ) : (
            <NewsGridListLoading />
          )
        ) : null}
      </div>
      {hasNextPage ? (
        <button
          className="mx-auto mt-1 box-border flex items-center justify-center rounded-xl px-2 py-1"
          onClick={() => fetchNextPage()}
        >
          <MdOutlineArrowBackIosNew className="-rotate-90 text-sm text-[#454C52]" />
          <span className="text-xs font-semibold text-[#454C52]">&nbsp;더 보기</span>
        </button>
      ) : null}
    </div>
  );
}

export default InfinityNewsList;
