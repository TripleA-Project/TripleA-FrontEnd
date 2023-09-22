'use client';

import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { cloneDeep } from 'lodash';
import { disLikeCategory, likeCategory } from '@/service/category';
import { APIResponse } from '@/interfaces/Dto/Core';
import { Category } from '@/interfaces/Category';

/* 
  카테고리 form의 mutate function hook 
  
  회원가입-카테고리 설정(단계별 폼),
  카테고리 설정 페이지에서의 form 공통 mutate 로직
*/

interface CategoryMutationArg {
  requestId: number;
  category: Category;
}

export interface CategoryResultList {
  like: Category[];
  unlike: Category[];
}

function useCategoryAsyncMutation() {
  const [success, setSuccess] = useState<{ likes: boolean; unlikes: boolean; authorizedMutation: boolean }>({
    likes: true,
    unlikes: true,
    authorizedMutation: true,
  });

  const successCategoryListRef = useRef<CategoryResultList>({
    like: [],
    unlike: [],
  });
  const failCategoryListRef = useRef<CategoryResultList>({
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
      like: cloneDeep(successCategoryListRef.current.like),
      unlike: cloneDeep(successCategoryListRef.current.unlike),
    };
  };

  const getFailList = () => {
    return {
      like: cloneDeep(failCategoryListRef.current.like),
      unlike: cloneDeep(failCategoryListRef.current.unlike),
    };
  };

  const getResultList = () => {
    return {
      success: { ...getSuccessList() },
      fail: { ...getFailList() },
    };
  };

  const resetResultList = () => {
    successCategoryListRef.current.like = [];
    successCategoryListRef.current.unlike = [];

    failCategoryListRef.current.like = [];
    failCategoryListRef.current.unlike = [];

    setSuccess((prev) => ({
      ...prev,
      likes: true,
      unlikes: true,
      authorizedMutation: true,
    }));
  };

  const { mutateAsync: like, status: likeStatus } = useMutation(
    ({ requestId, category }: CategoryMutationArg) => likeCategory({ id: requestId }),
    {
      retry: 0,
      onSuccess(data, categoryInfo) {
        const { category } = categoryInfo;

        successCategoryListRef.current.like.push({ category: category.category, categoryId: category.categoryId });
      },
      onError(error, categoryInfo) {
        const { category } = categoryInfo;

        handleAxiosError(error);

        failCategoryListRef.current.like.push({ category: category.category, categoryId: category.categoryId });

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
    ({ requestId, category }: CategoryMutationArg) => disLikeCategory({ id: requestId }),
    {
      retry: 0,
      onSuccess(data, categoryInfo) {
        const { category } = categoryInfo;

        successCategoryListRef.current.unlike.push({ category: category.category, categoryId: category.categoryId });
      },
      onError(error, categoryInfo) {
        const { category } = categoryInfo;

        handleAxiosError(error);

        failCategoryListRef.current.unlike.push({ category: category.category, categoryId: category.categoryId });

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

export default useCategoryAsyncMutation;
