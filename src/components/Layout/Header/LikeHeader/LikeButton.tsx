'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import SkeletonLike from './SkeletonLike';
import { AppIcons } from '@/components/Icons';
import { LockNotification } from '@/components/Notification';
import { disLikeSymbol, likeSymbol } from '@/service/symbol';
import { LockNotificationTemplate } from '@/constants/notification';
import { toastNotify } from '@/util/toastNotify';
import { useLikes } from '@/hooks/useLikes';
import type { Symbol } from '@/interfaces/Symbol';
import type { APIResponse } from '@/interfaces/Dto/Core';

type MutationType = 'like' | 'unlike';

interface HandleSuccessArgs {
  type: MutationType;
}

interface HandleErrorArgs {
  type: MutationType;
  error: unknown;
}

interface LikeButtonProps {
  symbol?: Symbol;
}

function LikeButton({ symbol }: LikeButtonProps) {
  const { likedSymbols, invalidateQuery, loginRequired, status: likesStatus } = useLikes();

  const [showSubscribeNotification, setShowSubscribeNotification] = useState(false);

  const handleSuccess = async ({ type }: HandleSuccessArgs) => {
    await invalidateQuery.likedSymbol();

    toastNotify('success', `관심 심볼 ${type === 'like' ? '생성' : '삭제'}에 성공했습니다`);
  };

  const handleError = ({ type, error }: HandleErrorArgs) => {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>;

      if (response?.data.status === HttpStatusCode.BadRequest) {
        setShowSubscribeNotification(true);

        return;
      }

      if (response?.data.status === HttpStatusCode.Unauthorized) {
        toastNotify('error', '로그인 후 심볼 추가/삭제가 가능합니다');

        return;
      }
    }

    toastNotify('error', `관심 심볼 ${type === 'like' ? '생성' : '삭제'}에 실패했습니다`);
  };

  const { mutate: likeMutate, status: likeMutateStatus } = useMutation((symbol: string) => likeSymbol({ symbol }), {
    onSuccess: async () => {
      await handleSuccess({ type: 'like' });
    },
    onError: (error) => {
      handleError({ type: 'like', error });
    },
  });

  const { mutate: unLikeMutate, status: unLikeMutateStatus } = useMutation(
    (unlikeTargetId: number) =>
      disLikeSymbol({
        id: unlikeTargetId,
      }),
    {
      onSuccess: async () => {
        await handleSuccess({ type: 'unlike' });
      },
      onError: (error) => {
        handleError({ type: 'unlike', error });
      },
    },
  );

  function isLike(symbol: Symbol) {
    if (likedSymbols.empty) return false;

    return !!likedSymbols.symbols!.find(
      (likedSymbol) => likedSymbol.symbol.toUpperCase() === symbol.symbol.toUpperCase(),
    );
  }

  function LikeHandler(symbol?: Symbol) {
    if (!symbol) return;
    if (likesStatus !== 'success') return;
    if (likeMutateStatus === 'loading' || unLikeMutateStatus === 'loading') return;

    if (loginRequired) {
      toastNotify('error', '로그인 후 심볼추가/삭제가 가능합니다');

      return;
    }

    if (isLike(symbol)) {
      const unlikeId = likedSymbols.symbols!.find(
        (likedSymbol) => likedSymbol.symbol.toUpperCase() === symbol.symbol.toUpperCase(),
      )!.symbolId;

      unLikeMutate(unlikeId);

      return;
    }

    likeMutate(symbol.symbol.toUpperCase());
  }

  if (likesStatus === 'loading') {
    return <SkeletonLike />;
  }

  return (
    <>
      <button onClick={() => LikeHandler(symbol)}>
        {symbol && isLike(symbol) ? <AppIcons.Heart.Fill.Orange /> : <AppIcons.Heart.Fill.Gray />}
      </button>
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
