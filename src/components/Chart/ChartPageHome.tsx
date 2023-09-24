'use client';

import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { usePageTab } from '@/redux/slice/pageTabSlice';
import SymbolTab from './SymbolTabs';
import RecommandSymbol from './RecommandSymbol';
import MyLikeSymbol from './MyLikeSymbol';
import { ToastContainer } from 'react-toastify';
import { SymbolLikeCardListLoading } from './SymbolTabs/SymbolCard';
import ChartHomeClientAPIErrorFallback from '../ErrorBoundary/ErrorFallback/Chart/ChartHomeClientAPIFallback';
import { syncCookie } from '@/util/cookies';
import type { ProfilePayload } from '@/interfaces/Dto/User';

export type ChartHomeTab = 'likedSymbols' | 'recommandSymbols';

export interface ChartPageHomeProps {
  user?: ProfilePayload;
}

function ChartPageHome({ user }: ChartPageHomeProps) {
  const { pageTabs } = usePageTab();

  const Loading = () => {
    switch (pageTabs.chartPageHomeTab) {
      case 'likedSymbols':
        return <SymbolLikeCardListLoading />;
      case 'recommandSymbols':
        return <SymbolLikeCardListLoading />;
    }
  };

  const RenderTabComponent = () => {
    switch (pageTabs.chartPageHomeTab) {
      case 'likedSymbols':
        return <MyLikeSymbol />;
      case 'recommandSymbols':
        return <RecommandSymbol />;
    }
  };

  useEffect(() => {
    syncCookie(user!.email);
  }, []); /* eslint-disable-line */

  return (
    <div className="box-border px-4">
      <SymbolTab />
      <ErrorBoundary FallbackComponent={ChartHomeClientAPIErrorFallback}>
        <Suspense
          fallback={
            <div className="mb-3 mt-5 box-border space-y-4">
              <Loading />
            </div>
          }
        >
          <RenderTabComponent />
        </Suspense>
      </ErrorBoundary>
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

export default ChartPageHome;
