import type { Symbol } from '@/interfaces/Symbol';
import SymbolCard, { SymbolCardLoading } from './SymbolCard';

interface SymbolCardListLoadingProps {
  length?: number;
}

interface SymbolCardListProps {
  symbols: Symbol[];
  logoBgColor?: string;
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

function SymbolCardList({ symbols, logoBgColor }: SymbolCardListProps) {
  return (
    <>
      {symbols.map((symbol, index) => (
        <SymbolCard key={`${symbol.symbol}-${symbol.symbolId}-${index}`} symbol={symbol} logoBgColor={logoBgColor} />
      ))}
    </>
  );
}

export default SymbolCardList;
