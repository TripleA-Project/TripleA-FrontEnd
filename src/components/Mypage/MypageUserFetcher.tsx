import React, { cloneElement } from 'react';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import MyPageUnauthorized from '../ErrorBoundary/ErrorFallback/Mypage/Unauthorized';
import MypageInternalServerError from '../ErrorBoundary/ErrorFallback/Mypage/InternalServerError';
import MypageTimeout from '../ErrorBoundary/ErrorFallback/Mypage/Timeout';
import { getProfile } from '@/service/user';
import { TIMEOUT_CODE } from '@/service/axios';
import type { APIResponse } from '@/interfaces/Dto/Core';
import type { ProfileResponse } from '@/interfaces/Dto/User';

interface MypageUserFetcherProps {
  children: React.ReactElement;
}

async function MypageUserFetcher({ children }: MypageUserFetcherProps) {
  const profileResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });

  if (profileResponse instanceof AxiosError) {
    const { code, response } = profileResponse as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) {
      return <MypageTimeout />;
    }

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return <MyPageUnauthorized />;
    }

    return <MypageInternalServerError />;
  }

  const profilePayload = (profileResponse as AxiosResponse<ProfileResponse>).data.data;

  const childComponent = cloneElement(children, {
    user: profilePayload,
  });

  return <>{childComponent}</>;
}

export default MypageUserFetcher;
