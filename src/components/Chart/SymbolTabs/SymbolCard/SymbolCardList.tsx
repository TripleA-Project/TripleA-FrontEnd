import type { Symbol } from '@/interfaces/Symbol';
import SymbolCard, { SymbolCardLoading } from './SymbolCard';

interface SymbolCardListLoadingProps {
  length?: number;
}

interface SymbolCardListProps {
  symbols: Symbol[];
}

export function SymbolCardListLoading({ length = 3 }: SymbolCardListLoadingProps) {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <SymbolCardLoading key={`${Date.now()}-${idx}`} />
      ))}
    </>
  );
}

function SymbolCardList({ symbols }: SymbolCardListProps) {
  return (
    <>
      {symbols.map((symbol, index) => (
        <SymbolCard key={`${symbol.symbol}-${symbol.symbolId}-${index}`} symbol={symbol} />
      ))}
    </>
  );
}

export default SymbolCardList;
