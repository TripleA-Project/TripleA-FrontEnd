'use client';

import React, { useEffect, useState } from 'react';
import { getProfile } from '@/service/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';
import { TIMEOUT_CODE } from '@/service/axios';

type ErrorType = 'Unauthorized' | 'Timeout' | 'InternalServerError';

export function useUser() {
  const queryClient = useQueryClient();

  const {
    data: profileResponse,
    status,
    isFetching,
    error,
    refetch,
  } = useQuery(['profile'], () => getProfile(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!error) return;

    if (error instanceof AxiosError) {
      const { code, response } = error as AxiosError<APIResponse>;

      if (code === TIMEOUT_CODE) {
        setErrorType('Timeout');
        return;
      }

      if (response?.data.status === HttpStatusCode.Unauthorized) {
        setErrorType('Unauthorized');
        return;
      }
    }

    setErrorType('InternalServerError');
  }, [error]);

  return {
    user: status === 'success' && profileResponse.status === HttpStatusCode.Ok ? profileResponse.data : null,
    isLoading: status === 'loading' || isFetching,
    errorType,
    refetchUser: refetch,
    invalidateQuery() {
      return queryClient.invalidateQueries(['profile']);
    },
    removeQuery() {
      queryClient.removeQueries(['profile']);
    },
  };
}
