'use client';

import React from 'react';
import ChartHomeHeader from '../Layout/Header/ChartHomeHeader';
import SymbolTab from './SymbolTabs';
import { redirect, useSearchParams } from 'next/navigation';
import RecommandSymbol from './RecommandSymbol';
import NotFound from '../NotFound';
import MyLikeSymbol from './MyLikeSymbol';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/service/user';
import { HttpStatusCode, isAxiosError } from 'axios';

function ChartPageHome() {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab');

  const {
    data: profileResponse,
    status: profileStatus,
    error: profileError,
  } = useQuery(['profile'], () => getProfile(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  if (profileStatus === 'loading') return null;

  if (profileStatus === 'error') {
    if (isAxiosError(profileError)) {
      const { response } = profileError;

      if (response?.status === HttpStatusCode.Unauthorized) {
        redirect('/login?continueURL=/chart');
      }

      return null;
    }
  }

  if (profileResponse?.status === HttpStatusCode.Unauthorized) {
    redirect('/login?continueURL=/chart');
  }

  return (
    <>
      <ChartHomeHeader />
      <div className={`box-border px-4`}>
        <SymbolTab />
        {tab ? tab === 'recommandSymbol' ? <RecommandSymbol /> : <NotFound /> : <MyLikeSymbol />}
      </div>
    </>
  );
}

export default ChartPageHome;
