'use client';

import { AdminEmailVerifyRequest, AdminEmailVerifyResponse } from '@/interfaces/Dto/Admin/AdminEmailVerifyDto';
import { adminEmailVerify } from '@/service/admin';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UseAdminVerifyMutation {
  onSuccess?: (
    data: AxiosResponse<AdminEmailVerifyResponse, any>,
    variables: AdminEmailVerifyRequest,
    context: unknown,
  ) => void;
  onError?: (error: unknown, variables: AdminEmailVerifyRequest, context: unknown) => void;
}

export function useAdminVerifyMutation({ onSuccess, onError }: UseAdminVerifyMutation = {}) {
  const { mutate, mutateAsync, status } = useMutation(
    ({ email, code }: AdminEmailVerifyRequest) => adminEmailVerify({ email, code }),
    {
      onSuccess,
      onError,
    },
  );

  return {
    adminEmailVerify: mutate,
    adminEmailVerifyAsync: mutateAsync,
    adminEmailVerifyStatus: status,
  };
}
