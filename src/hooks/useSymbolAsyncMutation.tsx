'use client';

import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { clone } from 'lodash';
import { disLikeSymbol, likeSymbol } from '@/service/symbol';
import { AxiosError, HttpStatusCode } from 'axios';
import type { APIResponse } from '@/interfaces/Dto/Core';
import type { SearchedSymbol, Symbol } from '@/interfaces/Symbol';

/* 
  심볼 form의 mutate function hook 
  
  회원가입-심볼 설정(단계별 폼),
  심볼 설정 페이지에서의 form 공통 mutate 로직
*/

interface SymbolLikeMutationArg {
  symbol: SearchedSymbol;
}

interface SymbolUnlikeMutationArg {
  requestId: number;
  symbol: SearchedSymbol;
}

export interface SymbolResultList {
  like: SearchedSymbol[];
  unlike: SearchedSymbol[];
}

export function useSymbolAsyncMutation() {
  const [success, setSuccess] = useState<{ likes: boolean; unlikes: boolean; authorizedMutation: boolean }>({
    likes: true,
    unlikes: true,
    authorizedMutation: true,
  });

  const successSymbolListRef = useRef<SymbolResultList>({
    like: [],
    unlike: [],
  });
  const failSymbolListRef = useRef<SymbolResultList>({
    like: [],
    unlike: [],
  });

  const handleAxiosError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>;

      if (response?.data.status === HttpStatusCode.Unauthorized) {
        if (success.authorizedMutation === true) {
          setSuccess((prev) => ({
            ...prev,
            authorizedMutation: false,
          }));
        }
      }
    }
  };

  const getSuccessList = () => {
    return {
      like: clone(successSymbolListRef.current.like),
      unlike: clone(successSymbolListRef.current.unlike),
    };
  };

  const getFailList = () => {
    return {
      like: clone(failSymbolListRef.current.like),
      unlike: clone(failSymbolListRef.current.unlike),
    };
  };

  const getResultList = () => {
    return {
      success: { ...getSuccessList() },
      fail: { ...getFailList() },
    };
  };

  const resetResultList = () => {
    successSymbolListRef.current.like = [];
    successSymbolListRef.current.unlike = [];

    failSymbolListRef.current.like = [];
    failSymbolListRef.current.unlike = [];

    setSuccess((prev) => ({
      ...prev,
      likes: true,
      unlikes: true,
      authorizedMutation: true,
    }));
  };

  const { mutateAsync: like, status: likeStatus } = useMutation(
    ({ symbol }: SymbolLikeMutationArg) => likeSymbol({ symbol: symbol.symbol.toUpperCase() }),
    {
      retry: 0,
      onSuccess(data, symbolArgs) {
        successSymbolListRef.current.like.push(symbolArgs.symbol);
      },
      onError(error, symbolArgs) {
        handleAxiosError(error);

        failSymbolListRef.current.like.push(symbolArgs.symbol);

        if (success.likes === true) {
          setSuccess((prev) => ({
            ...prev,
            likes: false,
          }));
        }
      },
    },
  );

  const { mutateAsync: unlike, status: unlikeStatus } = useMutation(
    ({ requestId, symbol }: SymbolUnlikeMutationArg) => disLikeSymbol({ id: requestId }),
    {
      retry: 0,
      onSuccess(data, symbolArgs) {
        successSymbolListRef.current.unlike.push(symbolArgs.symbol);
      },
      onError(error, symbolArgs, context) {
        handleAxiosError(error);

        failSymbolListRef.current.unlike.push(symbolArgs.symbol);

        if (success.unlikes === true) {
          setSuccess((prev) => ({
            ...prev,
            unlikes: false,
          }));
        }
      },
    },
  );

  return {
    like,
    unlike,
    getResultList,
    resetResultList,
    isSuccessLikes: success.likes,
    isSuccessUnlikes: success.unlikes,
    isUnauthorizedMutation: !success.authorizedMutation,
    isFetching: likeStatus === 'loading' || unlikeStatus === 'loading',
  };
}
