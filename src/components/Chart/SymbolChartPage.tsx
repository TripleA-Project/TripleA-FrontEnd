'use client';

import React, { Suspense, useState } from 'react';
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
import type { Symbol } from '@/interfaces/Symbol';
import type { ProfilePayload } from '@/interfaces/Dto/User';
import type { ResampleFrequency } from '@/interfaces/Dto/Stock';

interface SymbolChartPageProps {
  user?: ProfilePayload;
  matchedSymbol?: Symbol;
  resample: ResampleFrequency;
}

function SymbolChartPage({ user, matchedSymbol, resample }: SymbolChartPageProps) {
  const [sentimentList, setSentimentList] = useState<SentimentData[]>([]);

  return (
    <>
      <SymbolLikeHeader symbol={matchedSymbol} />
      <div className="relative box-border min-h-[calc(100vh-147px)] px-4">
        <SymbolChartNotification user={user} />
        <section className="mt-4">
          <ChartHeader symbolPayload={matchedSymbol} priceInfo={{} as any} symbol={''} sentimentData={sentimentList} />
          <Chart
            matchedSymbol={matchedSymbol!}
            resample={resample}
            onDataFetched={(source) => {
              if (!source) return;

              setSentimentList(source.sentimentData ?? []);
            }}
          />
          <ChartResampleGroup symbol={matchedSymbol?.symbol ?? ''} />
          <HorizontalLine style={{ marginTop: '1.25rem' }} />
          <section className="mb-11 mt-5">
            <h3 className="mb-4 font-bold text-black">{matchedSymbol?.symbol} 관련 뉴스</h3>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ChartShortNewsClientAPIErrorFallback symbol={matchedSymbol?.symbol ?? ''} {...props} />
              )}
            >
              <Suspense fallback={<NewsListLoading length={3} />}>
                <SymbolShortNews symbol={matchedSymbol?.symbol ?? ''} />
              </Suspense>
            </ErrorBoundary>
            <Link
              href={`/chart/symbol/news/${matchedSymbol?.symbol.toUpperCase()}`}
              className="mt-5 flex items-center justify-center"
            >
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
