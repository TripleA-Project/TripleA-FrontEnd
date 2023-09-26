import type { Symbol } from '@/interfaces/Symbol';
import SymbolLikeCard, { SymbolLikeCardLoading } from './SymbolLikeCard';

interface SymbolLikeCardListProps {
  symbols: Symbol[];
  logoBgColor?: string;
}

interface SymbolLikeCardListLoadingProps {
  length?: number;
}

export function SymbolLikeCardListLoading({ length = 3 }: SymbolLikeCardListLoadingProps) {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <SymbolLikeCardLoading key={`${Date.now()}-${idx}`} />
      ))}
    </>
  );
}

function SymbolLikeCardList({ symbols, logoBgColor }: SymbolLikeCardListProps) {
  return (
    <>
      {symbols.map((symbol, index) => (
        <SymbolLikeCard
          key={`${symbol.symbol}-${symbol.symbolId}-${index}`}
          symbol={symbol}
          logoBgColor={logoBgColor}
        />
      ))}
    </>
  );
}

export default SymbolLikeCardList;
