'use client';

import NoMySymbol from './NoMySymbol';
import { SymbolLikeCardList } from '../SymbolTabs/SymbolCard';
import { useLikedSymbols } from '@/hooks/useLikedSymbols';

function MyLikeSymbol() {
  const { likedSymbols } = useLikedSymbols({ suspense: true });

  if (likedSymbols.empty) {
    return (
      <div className="mb-3 mt-5 box-border space-y-4">
        <NoMySymbol />
      </div>
    );
  }

  return (
    <div className="mb-3 mt-5 box-border space-y-4">
      <SymbolLikeCardList symbols={likedSymbols.symbols!} />
    </div>
  );
}

export default MyLikeSymbol;
