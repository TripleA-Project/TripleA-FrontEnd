'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getLikeSymbol } from '@/service/symbol';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ChartNotify from '../ChartNotify';
import NoMySymbol from './NoMySymbol';

function MyLikeSymbol() {
  const {
    data: likeSymbolResponse,
    status,
    error,
  } = useQuery(['likeSymbol'], () => getLikeSymbol(), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const [resultState, setResultState] = useState<{ loginRequired: boolean; isEmpty: boolean }>({
    loginRequired: false,
    isEmpty: false,
  });

  useEffect(() => {
    if (!error) return;

    if ((error as AxiosError).response?.status === 401) {
      setResultState((prev) => ({ ...prev, loginRequired: true }));
    }
  }, [error]);

  useLayoutEffect(() => {
    if (status === 'success') {
      const payload = likeSymbolResponse.data.data;

      if (!payload || payload.length === 0) {
        setResultState((prev) => ({ ...prev, isEmpty: true }));
      }
    }
  }, [status]); /* eslint-disable-line */

  return (
    <div>
      {resultState.loginRequired ? (
        <ChartNotify
          title="로그인이 필요합니다"
          content="로그인 후 이용해주세요"
          buttonText="로그인하러 가기"
          linkTarget="/login"
        />
      ) : null}
      {resultState.isEmpty ? (
        <NoMySymbol />
      ) : status === 'success' && !resultState.isEmpty ? (
        <div>내 관심 심볼</div>
      ) : null}
    </div>
  );
}

export default MyLikeSymbol;
