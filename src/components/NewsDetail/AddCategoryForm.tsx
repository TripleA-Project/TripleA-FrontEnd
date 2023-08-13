'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import { disLikeCategory, getAllCategory, getLikeCategory, likeCategory } from '@/service/category';
import { toastNotify } from '@/util/toastNotify';
import { type Category } from '@/interfaces/Category';
import { type OnChipChangeResult } from '../UI/Chip/SymbolChip';
import { AxiosError, HttpStatusCode } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';

interface AddCategoryFormProps {
  category?: Category;
}

function AddCategoryForm({ category }: AddCategoryFormProps) {
  const queryClient = useQueryClient();

  const { data: allCategoryResponse, status: allCategoryStatus } = useQuery(['allCategory'], () => getAllCategory(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(payload) {
      return payload.data;
    },
    cacheTime: Infinity,
  });

  const { data: likedCategory, status: likedCategoryStatus } = useQuery(
    ['likedCategoryList'],
    () => getLikeCategory(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  const [liked, setLiked] = useState(isLike());

  function isLike() {
    return !!likedCategory?.data?.find((likeCategory) => likeCategory.category === category?.category);
  }

  const { mutateAsync: like } = useMutation((id: number) => likeCategory({ id }), {
    onSuccess() {
      toastNotify('success', '관심 카테고리 생성 성공');
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse<string & { key?: string; value?: string }>>;

        if (response?.data.status === HttpStatusCode.BadRequest) {
          if (response.data.data?.key === 'benefit') {
            toastNotify('error', '구독 후 4개 이상의 관심 카테고리 설정이 가능합니다.');

            return;
          }
        }

        toastNotify('error', '관심 카테고리 생성 실패');

        return;
      }

      toastNotify('error', '관심 카테고리 생성 실패');
    },
    onSettled() {
      queryClient.invalidateQueries(['likedCategoryList']);
    },
  });

  const { mutateAsync: unlike } = useMutation((id: number) => disLikeCategory({ id }), {
    onSuccess() {
      toastNotify('success', '관심 카테고리 삭제 성공');
    },
    onError() {
      setLiked(!!isLike());
      toastNotify('error', '관심 카테고리 삭제 실패');
    },
    onSettled() {
      queryClient.invalidateQueries(['likedCategoryList']);
    },
  });

  const handleChange: () => Promise<OnChipChangeResult> = async () => {
    if (likedCategoryStatus === 'loading') {
      return {
        type: 'api',
        status: 'loading',
      };
    }

    const liked = isLike();

    if (!liked) {
      const targetLikeCategory = allCategoryResponse?.data?.find(
        (categoryItem) => categoryItem.category === category?.category,
      );

      if (targetLikeCategory) {
        const targetLikeId = targetLikeCategory.categoryId;

        try {
          await like(targetLikeId);

          return {
            type: 'like',
            status: 'success',
          };
        } catch (err) {
          return {
            type: 'like',
            status: 'error',
          };
        }
      }
    }

    if (liked) {
      const targetUnlikeCategory = likedCategory?.data?.find(
        (likeCategory) => likeCategory.category === category?.category,
      );

      if (targetUnlikeCategory) {
        const targetUnlikeId = targetUnlikeCategory.categoryId;

        try {
          await unlike(targetUnlikeId);

          return {
            type: 'unlike',
            status: 'success',
          };
        } catch (err) {
          return {
            type: 'unlike',
            status: 'error',
          };
        }
      }
    }

    return { type: 'unknown', status: 'error' };
  };

  useEffect(() => {
    if (likedCategoryStatus !== 'success') return;

    const liked = isLike();

    setLiked(!!liked);
  }, [likedCategoryStatus, likedCategory]); /* eslint-disable-line */

  return (
    <>
      <h3 className="mb-4 text-xl font-semibold">관심 카테고리에 추가하기</h3>
      {category ? (
        <CategoryChip
          loading={allCategoryStatus === 'loading' || likedCategoryStatus === 'loading'}
          category={category}
          selected={liked}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
}

export default AddCategoryForm;
