'use client';

import { UpdateNoticeRequest, UpdateNoticeResponse } from '@/interfaces/Dto/Admin/UpdateNoticeDto';
import { updateNotice } from '@/service/notice';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UseUpdateNoticeMutation {
  onSuccess?: (
    data: AxiosResponse<UpdateNoticeResponse, any>,
    variables: UpdateNoticeRequest,
    context: unknown,
  ) => void;
  onError?: (error: unknown, variables: UpdateNoticeRequest, context: unknown) => unknown;
}

export function useUpdateNoticeMutation({ onSuccess, onError }: UseUpdateNoticeMutation = {}) {
  const { mutate, status } = useMutation(
    ({ id, title, content }: UpdateNoticeRequest) => updateNotice({ id, title, content }),
    {
      onSuccess,
      onError,
    },
  );

  return {
    updateNoticeMutate: mutate,
    updateNoticeMutateStatus: status,
  };
}
