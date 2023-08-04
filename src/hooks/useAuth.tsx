'use client';

import { ProfileResponse } from '@/interfaces/Dto/User';
import { MEMBERSHIP } from '@/interfaces/User';
import { getProfile } from '@/service/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState, useRef } from 'react';

type AuthStatus = 'Pending' | 'Loading' | 'AuthUser' | 'Guest';

interface AuthPayload {
  email: string;
  fullName: string;
  membership: keyof typeof MEMBERSHIP;
}

interface AuthState {
  status: AuthStatus;
  user?: AuthPayload;
}

function useAuth() {
  const queryClient = useQueryClient();

  const cacheData = queryClient.getQueryCache().get('["auth"]');
  const authStatus = !cacheData
    ? 'Pending'
    : cacheData.state.status === 'loading'
    ? 'Loading'
    : cacheData.state.status === 'error'
    ? 'Guest'
    : cacheData.state.status === 'success'
    ? 'AuthUser'
    : 'Pending';
  const cachedUserPaylaod = cacheData?.state.data
    ? (cacheData.state.data as AxiosResponse<ProfileResponse, any>).data.data
    : undefined;

  const [auth, setAuth] = useState<AuthState>({
    status: authStatus,
    user: cachedUserPaylaod
      ? {
          email: cachedUserPaylaod!.email,
          fullName: cachedUserPaylaod!.fullName,
          membership: cachedUserPaylaod!.membership,
        }
      : undefined,
  });

  const { data: authResponse, status } = useQuery(['auth'], () => getProfile(), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    enabled: !cacheData,
  });

  useEffect(() => {
    if (status === 'loading') {
      setAuth((auth) => ({ ...auth, status: 'Loading' }));

      return;
    }

    if (status === 'error') {
      setAuth((auth) => ({ ...auth, status: 'Guest' }));

      return;
    }

    if (authResponse.data.status === 401) {
      setAuth((auth) => ({ ...auth, status: 'Guest' }));

      return;
    }

    setAuth((auth) => ({ ...auth, status: 'AuthUser', user: authResponse?.data.data }));
  }, [status]); /* eslint-disable-line */

  return { status: auth.status, user: auth.user } as AuthState;
}

export default useAuth;
