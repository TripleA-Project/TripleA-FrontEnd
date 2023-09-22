'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import SymbolChartNotification from './Notification/SymbolChartNotification';
import SymbolLikeHeader from '../Layout/Header/LikeHeader/SymbolLikeHeader';
import ChartHeader from './ChartHeader';
import Chart from './Chart';
import ChartResampleGroup from './ChartResampleGroup';
import { NewsListLoading } from '../News/NewsList';
import SymbolShortNews from '../News/SymbolShortNews';
import { BsArrowRightShort } from 'react-icons/bs';
import ChartShortNewsClientAPIErrorFallback from '../ErrorBoundary/ErrorFallback/Chart/ChartShortNewsClientAPIFallback';
import { HorizontalLine } from '../UI/DivideLine';
import { SentimentData } from '@/service/chart';
import { syncCookie } from '@/util/cookies';
import type { Symbol } from '@/interfaces/Symbol';
import type { ProfilePayload } from '@/interfaces/Dto/User';
import type { ResampleFrequency } from '@/interfaces/Dto/Stock';
import { useRouter, useSearchParams } from 'next/navigation';

interface SymbolChartPageProps {
  user?: ProfilePayload;
  matchedSymbol?: Symbol | null;
  resample: ResampleFrequency;
}

function SymbolChartPage({ user, matchedSymbol, resample }: SymbolChartPageProps) {
  const { refresh } = useRouter();

  const searchParams = useSearchParams();
  const symbolName = searchParams.get('name');
  const requestSymbolName = matchedSymbol?.symbol?.toUpperCase() ?? (symbolName ? symbolName.toUpperCase() : '');

  const [chartIsEmpty, setChartIsEmpty] = useState(false);
  const [sentimentList, setSentimentList] = useState<SentimentData[]>([]);

  useEffect(() => {
    syncCookie(user!.email);

    return () => {
      refresh();
    };
  }, []); /* eslint-disable-line */

  return (
    <>
      <SymbolLikeHeader symbolName={symbolName} />
      <div className="relative box-border min-h-[calc(100vh-147px)] px-4">
        <SymbolChartNotification user={user} />
        <section className="mt-4">
          <ChartHeader symbolPayload={matchedSymbol} priceInfo={{} as any} symbol={''} sentimentData={sentimentList} />
          {chartIsEmpty ? (
            <div className="flex h-[322px] items-center justify-center">차트 데이터가 없습니다</div>
          ) : (
            <>
              <Chart
                matchedSymbol={matchedSymbol!}
                resample={resample}
                onDataFetched={(source, error) => {
                  if (error) {
                    setChartIsEmpty(true);
                    return;
                  }

                  if (!source) {
                    setChartIsEmpty(true);
                    return;
                  }

                  setSentimentList(source.sentimentData ?? []);
                }}
              />
              <ChartResampleGroup symbol={requestSymbolName} />
            </>
          )}
          <HorizontalLine style={{ marginTop: '1.25rem' }} />
          <section className="mb-11 mt-5">
            <h3 className="mb-4 font-bold text-black">{requestSymbolName} 관련 뉴스</h3>
            <ErrorBoundary
              fallbackRender={(props) => <ChartShortNewsClientAPIErrorFallback symbol={requestSymbolName} {...props} />}
            >
              <Suspense fallback={<NewsListLoading length={3} />}>
                <SymbolShortNews symbol={requestSymbolName} />
              </Suspense>
            </ErrorBoundary>
            <Link href={`/chart/symbol/news/${requestSymbolName}`} className="mt-5 flex items-center justify-center">
              <button className="box-border flex h-10 w-[311px] items-center justify-center rounded-3xl border-2 border-[#E2E6ED] px-4 py-3">
                <p className="font-bold">뉴스 전체보기</p>
                <BsArrowRightShort className="ml-[18px] shrink-0 text-2xl" />
              </button>
            </Link>
          </section>
        </section>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={true}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </div>
    </>
  );
}

export default SymbolChartPage;
