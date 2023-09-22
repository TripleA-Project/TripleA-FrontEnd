'use client';

import { HttpStatusCode } from 'axios';
import SymbolLikeHeader from '@/components/Layout/Header/LikeHeader/SymbolLikeHeader';
import { searchSymbolNews } from '@/service/news';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import NewsList, { NewsListLoading } from '../NewsList';
import InfiniteTrigger from '../InfiniteTrigger';
import { NewsData } from '@/interfaces/NewsData';
import FitPage from '@/components/Layout/FitPage';
import { AppIcons } from '@/components/Icons';
import SymbolNewsEmpty from './SymbolNewsEmpty';

interface SymbolNewsPageProps {
  symbolName?: string;
}

function SymbolNewsPage({ symbolName }: SymbolNewsPageProps) {
  const queryClient = useQueryClient();

  const {
    data: symbolNewsPageResponse,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['news', 'symbol', symbolName?.toUpperCase()],
    ({ pageParam = 0 }) => searchSymbolNews({ symbol: symbolName ?? '', page: pageParam }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!symbolName,
      getNextPageParam: (lastPage) => {
        const { data: LastPageResponse, status } = lastPage;

        const nextPage = LastPageResponse.data?.nextPage;

        return status === HttpStatusCode.Ok && nextPage ? nextPage : undefined;
      },
    },
  );

  const RenderNewsList = () => {
    if (isSuccess) {
      if (!symbolNewsPageResponse.pages[0].data.data?.news?.length) {
        return <SymbolNewsEmpty />;
      }

      return (
        <NewsList
          newsList={symbolNewsPageResponse.pages.flatMap((page) =>
            page.data.data?.news ? (page.data.data.news as NewsData[]) : [],
          )}
          onBookmark={() => {
            queryClient.invalidateQueries(['news', 'symbol', symbolName?.toUpperCase()]);
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className="box-border px-4">
      <section className="mb-4 mt-6">
        <SymbolLikeHeader symbolName={symbolName} />
        <h4 className="font-semibold">{`${symbolName?.toUpperCase()} 관련 뉴스` ?? ''}</h4>
      </section>
      <section className="space-y-4">
        <RenderNewsList />
        {isLoading || (isFetchingNextPage && hasNextPage) ? <NewsListLoading /> : null}
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
