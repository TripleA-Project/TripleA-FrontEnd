import { Suspense } from 'react';
import DispatchSearchSymbolChip from './DispatchSearchSymbolChip';
import RecommandSymbolListWrapper from './RecommandSymbolList/RecommandSymbolListWrapper';
import RecommandSymbolListLoading from './RecommandSymbolList/RecommandSymbolListLoading';
import RecommandSymbolList from './RecommandSymbolList';
import GuardBox from '@/components/UI/GuardBox';
import type { SearchedSymbol } from '@/interfaces/Symbol';

interface SearchSymbolResultProps {
  symbols: SearchedSymbol[];
  isSyncing?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function SearchSymbolResult({ symbols, onDispatch, isSyncing = false }: SearchSymbolResultProps) {
  if (!symbols?.length) {
    return (
      <div className="mb-8 mt-[60px]">
        <RecommandSymbolListWrapper>
          <Suspense fallback={<RecommandSymbolListLoading />}>
            <RecommandSymbolList isSyncing={isSyncing} onDispatch={onDispatch} />
          </Suspense>
        </RecommandSymbolListWrapper>
      </div>
    );
  }

  return (
    <div className="mb-8 mt-[60px] h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
      <div className="relative flex w-full flex-wrap gap-[10px]">
        <GuardBox activeGuard={isSyncing} />
        {symbols.map((matchedSymbol, index) => (
          <DispatchSearchSymbolChip
            key={`search-${matchedSymbol.symbol.toUpperCase()}-${index}`}
            symbol={matchedSymbol}
            allowClickDispatch
            onDispatch={onDispatch}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchSymbolResult;
