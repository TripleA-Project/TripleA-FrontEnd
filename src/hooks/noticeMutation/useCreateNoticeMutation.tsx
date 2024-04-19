'use client';

import { CreateNoticeRequest, CreateNoticeResponse } from '@/interfaces/Dto/Admin/CreateNoticeDto';
import { createNotice } from '@/service/notice';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UseCreateNoticeMutation {
  onSuccess?: (
    data: AxiosResponse<CreateNoticeResponse, any>,
    variables: CreateNoticeRequest,
    context: unknown,
  ) => void;
  onError?: (error: unknown, variables: CreateNoticeRequest, context: unknown) => void;
}

export function useCreateNoticeMutation({ onSuccess, onError }: UseCreateNoticeMutation = {}) {
  const { mutate, status } = useMutation(
    ({ title, content }: CreateNoticeRequest) => createNotice({ title, content }),
    {
      onSuccess,
      onError,
    },
  );

  return {
    createNoticeMutate: mutate,
    createNoticeMutateStatus: status,
  };
}
