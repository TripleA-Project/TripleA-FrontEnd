'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { redirect } from 'next/navigation';
import Profile from '../Profile';
import MembershipInfo from '../Membership/MembershipInfo';
import MyPageMenu from './MyPageMenu';
import { getProfile } from '@/service/user';

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

  if (profileStatus === 'loading') return null;

  if (profileStatus === 'error') {
    if (isAxiosError(profileError)) {
      const { response } = profileError;

      if (response?.status === HttpStatusCode.Unauthorized) {
        redirect('/login?continueURL=/mypage');
      }
    }

    return null;
  }

  if (profileResponse?.status === HttpStatusCode.Unauthorized) {
    redirect('/login?continueURL=/mypage');
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
