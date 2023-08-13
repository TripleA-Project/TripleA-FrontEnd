'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AxiosError, HttpStatusCode } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SymbolChip, { OnChipChangeResult } from '@/components/UI/Chip/SymbolChip';
import { disLikeSymbol, getLikeSymbol, likeSymbol } from '@/service/symbol';
import { toastNotify } from '@/util/toastNotify';
import { type APIResponse } from '@/interfaces/Dto/Core';
import { type NewsDetailSymbol } from '@/interfaces/Dto/News';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';

interface ActionSymbolChipProps {
  symbol: NewsDetailSymbol;
}

function ActionSymbolChip({ symbol }: ActionSymbolChipProps) {
  const queryClient = useQueryClient();

  const {
    data: likedSymbol,
    status: likedSymbolStatus,
    fetchStatus: likedSymbolFetchStatus,
  } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const [liked, setLiked] = useState(isLike());

  const isFetchingRef = useRef<boolean>(false);

  function isFetching() {
    return !!isFetchingRef.current;
  }

  function isLike() {
    return !!likedSymbol?.data?.find((likeSymbol) => likeSymbol.symbol === symbol.name);
  }

  const { mutateAsync: like } = useMutation((symbol: string) => likeSymbol({ symbol }), {
    onSuccess() {
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
      queryClient.invalidateQueries(['likedSymbolList']);

      isFetchingRef.current = false;
    },
  });

  const { mutateAsync: unlike } = useMutation((id: number) => disLikeSymbol({ id }), {
    onSuccess() {
      toastNotify('success', '관심 심볼 삭제 성공');
    },
    onError() {
      toastNotify('error', '관심 심볼 삭제 실패');
    },
    onSettled() {
      queryClient.invalidateQueries(['likedSymbolList']);

      isFetchingRef.current = false;
    },
  });

  const handleChange: () => Promise<OnChipChangeResult> = async () => {
    isFetchingRef.current = true;

    if (likedSymbolStatus === 'loading' || likedSymbolFetchStatus === 'fetching') {
      isFetchingRef.current = false;

      return {
        type: 'api',
        status: 'loading',
      };
    }

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
      const unlikeTarget = likedSymbol!.data!.find((likedSymbol) => likedSymbol.symbol === symbol.name);

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

  useEffect(() => {
    if (likedSymbolStatus !== 'success') return;

    const liked = isLike();

    setLiked(!!liked);
  }, [likedSymbolStatus, likedSymbol]); /* eslint-disable-line */

  return (
    <div className="relative inline-block align-top">
      {isFetching() ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <div className="translate-y-[3.4px]">
            <MuiSpinner size={26} />
          </div>
        </div>
      ) : null}
      <SymbolChip
        loading={likedSymbolStatus === 'loading'}
        symbol={symbol as any}
        selected={liked}
        onChange={handleChange}
      />
    </div>
  );
}

export default ActionSymbolChip;
