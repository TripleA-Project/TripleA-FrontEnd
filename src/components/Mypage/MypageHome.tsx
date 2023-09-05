'use client';

import React from 'react';
import { useIsFetching, useQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import Profile from '../Profile';
import MembershipInfo from '../Membership/MembershipInfo';
import MyPageMenu from './MyPageMenu';
import MyPageHomeLoading from './MyPageHomeLoading';
import MyPageUnauthorized from '../ErrorBoundary/ErrorFallback/Mypage/Unauthorized';
import MypageTimeout from '../ErrorBoundary/ErrorFallback/Mypage/Timeout';
import MypageInternalServerError from '../ErrorBoundary/ErrorFallback/Mypage/InternalServerError';
import { getProfile } from '@/service/user';
import { TIMEOUT_CODE } from '@/service/axios';

function MypageHome() {
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

  const isFetching = useIsFetching(['profile']);

  if (profileStatus === 'loading' || isFetching) return <MyPageHomeLoading />;

  if (profileStatus === 'error') {
    if (isAxiosError(profileError)) {
      const { code, response } = profileError;

      if (response?.status === HttpStatusCode.Unauthorized) {
        return <MyPageUnauthorized />;
      }

      if (code === TIMEOUT_CODE) return <MypageTimeout />;
    }

    return <MypageInternalServerError />;
  }

  if (profileResponse?.status === HttpStatusCode.Unauthorized) {
    return <MyPageUnauthorized />;
  }

  return (
    <div className={`mt-[73px] box-border px-4`}>
      <Profile
        userProfile={{
          email: profileResponse.data?.email ?? '',
          fullName: profileResponse.data?.fullName ?? '',
          membership: profileResponse.data?.membership ?? 'BASIC',
        }}
      />
      <MembershipInfo />
      <MyPageMenu />
    </div>
  );
}

export default MypageHome;
