'use client';

import { getLikeSymbol } from '@/service/symbol';
import { useQuery } from '@tanstack/react-query';
import NoMySymbol from './NoMySymbol';
import { SymbolCardList, SymbolCardListLoading } from '../SymbolTabs/SymbolCard';

function MyLikeSymbol() {
  const { data: likeSymbolPayload, status: likeSymbolStatus } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: false,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  return (
    <div className="mb-3 mt-5 box-border space-y-4">
      {likeSymbolStatus !== 'success' ? (
        <SymbolCardListLoading />
      ) : likeSymbolPayload?.data && likeSymbolPayload.data.length ? (
        <SymbolCardList symbols={likeSymbolPayload.data} />
      ) : (
        <NoMySymbol />
      )}
    </div>
  );
}

export default MyLikeSymbol;
