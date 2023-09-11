'use client';

import React, { Suspense, useEffect } from 'react';
import ChartHomeHeader from '../Layout/Header/ChartHomeHeader';
import SymbolTab from './SymbolTabs';
import RecommandSymbol from './RecommandSymbol';
import MyLikeSymbol from './MyLikeSymbol';
import { SymbolCardListLoading, SymbolLikeCardListLoading } from './SymbolTabs/SymbolCard';
import { syncCookie } from '@/util/cookies';
import type { ProfilePayload } from '@/interfaces/Dto/User';
import { ErrorBoundary } from 'react-error-boundary';
import ChartHomeClientAPIErrorFallback from '../ErrorBoundary/ErrorFallback/Chart/ChartHomeClientAPIFallback';

export type ChartHomeTab = 'recommandSymbol' | 'likeSymbol';

export interface ChartPageHomeProps {
  tab: ChartHomeTab;
  user?: ProfilePayload;
}

function ChartPageHome({ tab, user }: ChartPageHomeProps) {
  const Loading = () => {
    switch (tab) {
      case 'likeSymbol':
        return <SymbolCardListLoading />;
      case 'recommandSymbol':
        return <SymbolLikeCardListLoading />;
    }
  };

  const RenderTabComponent = () => {
    switch (tab) {
      case 'likeSymbol':
        return <MyLikeSymbol />;
      case 'recommandSymbol':
        return <RecommandSymbol />;
    }
  };

  useEffect(() => {
    syncCookie(user!.email);
  }, []); /* eslint-disable-line */

  return (
    <>
      <ChartHomeHeader />
      <div className={`box-border px-4`}>
        <SymbolTab />
        <ErrorBoundary FallbackComponent={ChartHomeClientAPIErrorFallback}>
          <Suspense
            fallback={
              <div className="mt-5">
                <Loading />
              </div>
            }
          >
            <RenderTabComponent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default ChartPageHome;
