'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import SkeletonLike from './SkeletonLike';
import { AppIcons } from '@/components/Icons';
import { disLikeSymbol, getLikeSymbol, likeSymbol } from '@/service/symbol';
import { toastNotify } from '@/util/toastNotify';
import { LockNotification } from '@/components/Notification';
import { LockNotificationTemplate } from '@/constants/notification';
import { type Symbol } from '@/interfaces/Symbol';
import { type LikeSymbolResponse } from '@/interfaces/Dto/Symbol';

interface LikeButtonProps {
  symbol?: Symbol;
}

function LikeButton({ symbol }: LikeButtonProps) {
  const queryClient = useQueryClient();

  const [showSubscribeNotification, setShowSubscribeNotification] = useState(false);

  const { data: getLikeSymbolResponse, status: getLikeSymbolStatus } = useQuery(
    ['likedSymbolList'],
    () => getLikeSymbol(),
    { retry: false, refetchOnWindowFocus: false },
  );

  const { mutate: likeMutate, status: likeMutateStatus } = useMutation((symbol: string) => likeSymbol({ symbol }), {
    onSuccess: () => {
      toastNotify('success', '관심 심볼 생성에 성공했습니다');
      queryClient.invalidateQueries(['likedSymbolList']);
    },
    onError: (error) => {
      if (isAxiosError<LikeSymbolResponse>(error)) {
        const { response } = error;

        if (response?.data.status === HttpStatusCode.BadRequest) {
          setShowSubscribeNotification(true);

          return;
        }
      }

      toastNotify('error', '관심 심볼 생성에 실패했습니다');
    },
  });

  const { mutate: unLikeMutate, status: unLikeMutateStatus } = useMutation(
    (unlikeTargetId: number) =>
      disLikeSymbol({
        id: unlikeTargetId,
      }),
    {
      onSuccess: () => {
        toastNotify('success', '관심 심볼 삭제에 성공했습니다');
        queryClient.invalidateQueries(['likedSymbolList']);
      },
      onError: () => {
        toastNotify('error', '관심 심볼 삭제에 실패했습니다');
      },
    },
  );

  function isLike(symbol: Symbol) {
    if (getLikeSymbolStatus !== 'success') return false;
    if (getLikeSymbolResponse && !getLikeSymbolResponse.data.data?.length) return false;

    const isLikeSymbol = getLikeSymbolResponse.data.data!.find(
      (likedSymbol) => likedSymbol.symbol.toUpperCase() === symbol.symbol.toUpperCase(),
    );

    return !!isLikeSymbol;
  }

  function LikeHandler(symbol: Symbol) {
    if (getLikeSymbolStatus !== 'success') return;
    if (likeMutateStatus === 'loading' || unLikeMutateStatus === 'loading') return;

    if (isLike(symbol)) {
      const unlikeTarget = getLikeSymbolResponse.data.data?.find(
        (likeSymbol) => likeSymbol.symbol.toUpperCase() === symbol.symbol.toUpperCase(),
      );

      if (!unlikeTarget) return;

      unLikeMutate(unlikeTarget.symbolId);

      return;
    }

    likeMutate(symbol.symbol.toUpperCase());
  }

  return (
    <>
      {getLikeSymbolStatus === 'loading' ? (
        <SkeletonLike />
      ) : (
        <button onClick={symbol ? () => LikeHandler(symbol) : () => toastNotify('error', '잘못된 요청입니다')}>
          {symbol && isLike(symbol) ? <AppIcons.Heart.Fill.Orange /> : <AppIcons.Heart.Fill.Gray />}
        </button>
      )}
      <LockNotification
        active={showSubscribeNotification}
        closeOnClick
        onClose={() => {
          setShowSubscribeNotification(false);
        }}
        title={LockNotificationTemplate.MoreLikeRequiredSubscribe.title}
        content={LockNotificationTemplate.MoreLikeRequiredSubscribe.content}
        buttonText={LockNotificationTemplate.MoreLikeRequiredSubscribe.buttonText}
        linkURL={LockNotificationTemplate.MoreLikeRequiredSubscribe.linkURL}
      />
    </>
  );
}

export default LikeButton;
