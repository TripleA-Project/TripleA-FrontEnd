'use client';

import { getLikeSymbol } from '@/service/symbol';
import { useQuery } from '@tanstack/react-query';
import NoMySymbol from './NoMySymbol';
import { SymbolLikeCardList } from '../SymbolTabs/SymbolCard';

function MyLikeSymbol() {
  const { data: likeSymbolPayload } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
    suspense: true,
  });

  if (likeSymbolPayload?.data && !likeSymbolPayload.data.length) {
    return (
      <div className="mb-3 mt-5 box-border space-y-4">
        <NoMySymbol />
      </div>
    );
  }

  return (
    <div className="mb-3 mt-5 box-border space-y-4">
      <SymbolLikeCardList symbols={likeSymbolPayload?.data!} />
    </div>
  );
}

export default MyLikeSymbol;
