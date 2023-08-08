import DispatchSearchSymbolChip from './DispatchSearchSymbolChip';
import RecommandSymbolList from './RecommandSymbolList';
import { type SearchedSymbol } from '@/interfaces/Symbol';

interface SearchSymbolResultProps {
  symbols: SearchedSymbol[];
  loading?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function SearchSymbolResultLoading() {
  return (
    <div className="skeleton_loading">
      <div className="mb-8 mt-[60px] h-[200px]" />
    </div>
  );
}

function SearchSymbolResult({ symbols, loading, onDispatch }: SearchSymbolResultProps) {
  if (!symbols?.length) {
    return (
      <div className="mb-8 mt-[60px]">
        <RecommandSymbolList onDispatch={onDispatch} />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 mt-[60px] h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
        <div className="flex w-full flex-wrap gap-[10px]">
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
    </>
  );
}

export default SearchSymbolResult;
