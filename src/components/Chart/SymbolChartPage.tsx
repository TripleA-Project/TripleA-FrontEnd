'use client';

import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { syncCookie } from '@/util/cookies';
import type { Symbol } from '@/interfaces/Symbol';
import type { ProfilePayload } from '@/interfaces/Dto/User';

interface SymbolChartPageProps {
  user?: ProfilePayload;
  matchedSymbol?: Symbol | null;
}

function SymbolChartPage({ user, matchedSymbol }: SymbolChartPageProps) {
  const { refresh } = useRouter();

  const symbolName = useSearchParams().get('name');
  const requestSymbolName = matchedSymbol?.symbol?.toUpperCase() ?? (symbolName ? symbolName.toUpperCase() : '');

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
          <ChartHeader symbolPayload={matchedSymbol} symbolName={requestSymbolName} />
          <Chart matchedSymbol={matchedSymbol!} />
          <ChartResampleGroup symbol={requestSymbolName} />
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
        <ToastContainer position="bottom-center" newestOnTop={true} />
      </div>
    </>
  );
}

export default SymbolChartPage;
