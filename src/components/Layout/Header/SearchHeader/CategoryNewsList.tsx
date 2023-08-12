'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import NewsList, { NewsListLoading } from '@/components/News/NewsList';
import InfiniteTrigger from '@/components/News/InfiniteTrigger';
import { SymbolLikeCardList, SymbolLikeCardListLoading } from '@/components/Chart/SymbolTabs/SymbolCard';
import { HorizontalLine } from '@/components/UI/DivideLine';
import { NoResult } from './SearchResult';
import { getSymbol } from '@/service/symbol';
import { searchCategoryNews } from '@/service/news';
import { type Category } from '@/interfaces/Category';
import { type Symbol } from '@/interfaces/Symbol';
import { type NewsData } from '@/interfaces/NewsData';

interface CategoryNewsListProps {
  category: Category;
}

function CategoryNewsList({ category }: CategoryNewsListProps) {
  const queryClient = useQueryClient();

  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [symbolLoading, setSymbolLoading] = useState(true);

  const {
    data: categoryNewsPageResponse,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['news', 'category', category.categoryId],
    ({ pageParam = 0 }) => searchCategoryNews({ categoryId: category.categoryId, page: pageParam }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const { data: LastPageResponse, status } = lastPage;

        const nextPage = LastPageResponse?.data?.nextPage;

        return status === HttpStatusCode.Ok && nextPage ? nextPage : undefined;
      },
    },
  );

  useEffect(() => {
    async function getRelatedSymbols(symbols: string[]) {
      const symbolPromises = await Promise.allSettled(symbols.map((symbol) => getSymbol({ symbol })));

      const symbolSet = new Set();

      const symbolPromiseList = symbolPromises
        .filter((symbolPromise) => symbolPromise.status === 'fulfilled' && symbolPromise.value.data.data?.length)
        .flatMap((symbolPromise) => {
          if (symbolPromise.status !== 'fulfilled') return [];

          return symbolPromise.value.data.data as Symbol[];
        })
        .filter((symbol) => {
          if (symbolSet.has(symbol.symbol.toUpperCase())) return false;

          symbolSet.add(symbol.symbol.toUpperCase());

          return true;
        })
        .slice(0, 4);

      setSymbolLoading(false);
      setSymbols(symbolPromiseList);
    }

    if (isLoading) return;

    const firstPage = categoryNewsPageResponse?.pages[0].data?.data?.news;

    if (firstPage?.length) {
      const symbolList = firstPage.map((news) => news.symbol);

      getRelatedSymbols(symbolList);

      return;
    }

    setSymbolLoading(false);
  }, [isLoading]); /* eslint-disable-line */

  if (isSuccess && !categoryNewsPageResponse.pages[0].data?.data?.news?.length) return <NoResult />;

  return (
    <div className="box-border bg-white px-4">
      <div className="my-5">
        <h2 className="mb-5 font-bold">관련 종목</h2>
        <div className="space-y-2.5">
          {symbolLoading ? <SymbolLikeCardListLoading length={4} /> : <SymbolLikeCardList symbols={symbols} />}
        </div>
      </div>
      <HorizontalLine />
      <div>
        <h2 className="mb-4 mt-5 font-bold">관련 뉴스</h2>
        <div>
          {isSuccess ? (
            <NewsList
              newsList={categoryNewsPageResponse.pages.flatMap((page) =>
                page.data.data ? (page.data.data.news as NewsData[]) : [],
              )}
              onBookmark={() => {
                queryClient.invalidateQueries(['news', 'category', category.categoryId]);
              }}
            />
          ) : null}
          {(isLoading || isFetchingNextPage) && hasNextPage ? <NewsListLoading /> : null}
        </div>
      </div>
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
    </div>
  );
}

export default CategoryNewsList;
