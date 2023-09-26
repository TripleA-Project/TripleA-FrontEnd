'use client';

import React, { useState } from 'react';
import { AxiosError, HttpStatusCode } from 'axios';
import { useMutation } from '@tanstack/react-query';
import SymbolChip, { OnChipChangeResult } from '@/components/UI/Chip/SymbolChip';
import { disLikeSymbol, likeSymbol } from '@/service/symbol';
import { toastNotify } from '@/util/toastNotify';
import GuardBox from '@/components/UI/GuardBox';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { useLikedSymbols } from '@/hooks/useLikedSymbols';
import type { APIResponse } from '@/interfaces/Dto/Core';
import type { NewsDetailSymbol } from '@/interfaces/Dto/News';

interface ActionSymbolChipProps {
  symbol: NewsDetailSymbol;
}

function ActionSymbolChip({ symbol }: ActionSymbolChipProps) {
  const { likedSymbols, loginRequired, invalidateQuery, status: likedSymbolsStatus } = useLikedSymbols();

  const [isMutationFetching, setIsMutationFetching] = useState(false);

  function isLike() {
    if (likedSymbolsStatus === 'loading' || likedSymbolsStatus === 'fetching') return false;
    if (loginRequired) return false;

    return !!likedSymbols.symbols?.find(
      (likedSymbol) => likedSymbol.symbol.toUpperCase() === symbol.name.toUpperCase(),
    );
  }

  const { mutateAsync: like } = useMutation((symbol: string) => likeSymbol({ symbol }), {
    onSuccess() {
      invalidateQuery.likedSymbols();

      toastNotify('success', '관심 심볼 생성 성공');
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse<string & { key?: string; value?: string }>>;

        if (response?.data.status === HttpStatusCode.BadRequest) {
          if (response.data.data?.key === 'benefit') {
            toastNotify('error', '구독 후 4개 이상의 관심 종목 설정이 가능합니다.');

            return;
          }
        }

        toastNotify('error', '관심 심볼 생성 실패');

        return;
      }

      toastNotify('error', '관심 심볼 생성 실패');
    },
    onSettled() {
      setIsMutationFetching((prev) => false);
    },
  });

  const { mutateAsync: unlike } = useMutation((id: number) => disLikeSymbol({ id }), {
    onSuccess() {
      invalidateQuery.likedSymbols();

      toastNotify('success', '관심 심볼 삭제 성공');
    },
    onError() {
      toastNotify('error', '관심 심볼 삭제 실패');
    },
    onSettled() {
      setIsMutationFetching((prev) => false);
    },
  });

  const handleChange: () => Promise<OnChipChangeResult> = async () => {
    if (isMutationFetching) {
      return { type: 'api', status: 'loading' };
    }

    if (likedSymbolsStatus === 'loading' || likedSymbolsStatus === 'fetching') {
      return {
        type: 'api',
        status: 'loading',
      };
    }

    setIsMutationFetching((prev) => true);

    const liked = isLike();

    if (!liked) {
      try {
        await like(symbol.name.toUpperCase());

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

    if (liked) {
      const unlikeTarget = likedSymbols.symbols?.find(
        (likedSymbol) => likedSymbol.symbol.toUpperCase() === symbol.name.toUpperCase(),
      );

      try {
        await unlike(unlikeTarget ? unlikeTarget.symbolId : -1);

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

    return { type: 'unknown', status: 'error' };
  };

  return (
    <div className="relative inline-block align-top">
      {isMutationFetching ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <div className="translate-y-[3.4px]">
            <MuiSpinner size={26} />
          </div>
        </div>
      ) : null}
      <GuardBox activeGuard={likedSymbolsStatus === 'fetching'} />
      <SymbolChip
        loading={likedSymbolsStatus === 'loading'}
        symbol={symbol as any}
        selected={isLike()}
        onChange={handleChange}
      />
    </div>
  );
}

export default ActionSymbolChip;
