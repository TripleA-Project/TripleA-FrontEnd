'use client';

import { SymbolLikeCardList } from '../SymbolTabs/SymbolCard';
import NoRecommandSymbol from './NoRecommandSymbol';
import useRecommandSymbols from '@/hooks/useRecommandSymbols';

function RecommandSymbol() {
  const { recommandSymbols } = useRecommandSymbols({ suspense: true });

  if (recommandSymbols.empty) {
    return <NoRecommandSymbol />;
  }

  return (
    <div className="mb-3 mt-5 box-border space-y-4">
      <SymbolLikeCardList symbols={recommandSymbols.symbols!} />
    </div>
  );
}

export default RecommandSymbol;
