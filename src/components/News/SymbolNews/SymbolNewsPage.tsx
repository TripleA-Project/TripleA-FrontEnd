'use client';

import SymbolLikeHeader from '@/components/Layout/Header/LikeHeader/SymbolLikeHeader';
import { Symbol } from '@/interfaces/Symbol';
import { searchSymbolNews } from '@/service/news';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import NewsList, { NewsListLoading } from '../NewsList';
import InfiniteTrigger from '../InfiniteTrigger';

interface SymbolNewsPageProps {
  symbol?: Symbol;
}

function SymbolNewsPage({ symbol }: SymbolNewsPageProps) {
  const {
    data: symbolNewsPageResponse,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['news', 'symbol', symbol?.symbol.toUpperCase()],
    ({ pageParam = 0 }) => searchSymbolNews({ symbol: symbol!.symbol, page: pageParam }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!symbol,
      getNextPageParam: (lastPage) => {
        const { data: LastPageResponse, status } = lastPage;

        const nextPage = LastPageResponse.data?.nextPage;

        return status === 200 && nextPage ? nextPage : undefined;
      },
    },
  );

  return (
    <div className="box-border px-4">
      <section className="mb-4 mt-6">
        <SymbolLikeHeader symbol={symbol} />
        <h4 className="font-semibold">{`${symbol?.symbol.toUpperCase()} 관련 뉴스` ?? ''}</h4>
      </section>
      <section className="space-y-4">
        {isLoading ? <NewsListLoading /> : null}
        {isSuccess
          ? symbolNewsPageResponse.pages.map((response) => {
              return (
                <NewsList
                  key={`${Date.now()}-${response.data.data?.nextPage}`}
                  newsList={response.data.data?.news ?? []}
                />
              );
            })
          : null}
        {isFetchingNextPage && hasNextPage ? <NewsListLoading /> : null}
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
    </div>
  );
}

export default SymbolNewsPage;
