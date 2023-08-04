'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SymbolChip, { type OnChipChangeResult } from '@/components/UI/Chip/SymbolChip';
import { disLikeSymbol, getLikeSymbol, likeSymbol } from '@/service/symbol';
import { toastNotify } from '@/util/toastNotify';
import { type NewsDetailSymbol } from '@/interfaces/Dto/News';

interface AddSymbolFormProps {
  symbol: NewsDetailSymbol;
}

function AddSymbolForm({ symbol }: AddSymbolFormProps) {
  const queryClient = useQueryClient();

  const { data: likedSymbol, status: likedSymbolStatus } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const [liked, setLiked] = useState(isLike());

  function isLike() {
    return !!likedSymbol?.data?.find((likeSymbol) => likeSymbol.symbol === symbol.name);
  }

  const { mutateAsync: like } = useMutation((symbol: string) => likeSymbol({ symbol }), {
    onSuccess() {
      toastNotify('success', '관심 심볼 생성 성공');
    },
    onError() {
      toastNotify('error', '관심 심볼 생성 실패');
    },
    onSettled() {
      queryClient.invalidateQueries(['likedSymbolList']);
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
    },
  });

  const handleChange: () => Promise<OnChipChangeResult> = async () => {
    if (!isLike()) {
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

    if (isLike()) {
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

    return {
      type: 'unknown',
      status: 'error',
    };
  };

  useEffect(() => {
    if (likedSymbolStatus !== 'success') return;

    const liked = isLike();

    setLiked(!!liked);
  }, [likedSymbolStatus, likedSymbol]); /* eslint-disable-line */

  return (
    <>
      <h3 className="mb-4 text-xl font-semibold">관심 종목에 추가하기</h3>
      <SymbolChip
        loading={likedSymbolStatus === 'loading'}
        symbol={symbol as any}
        selected={liked}
        onChange={handleChange}
      />
    </>
  );
}

export default AddSymbolForm;
