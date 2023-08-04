import SymbolLikeCard, { SymbolLikeCardLoading } from './SymbolLikeCard';
import { type Symbol } from '@/interfaces/Symbol';

interface SymbolLikeCardListProps {
  symbols: Symbol[];
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

function SymbolLikeCardList({ symbols }: SymbolLikeCardListProps) {
  return (
    <>
      {symbols.map((symbol, index) => (
        <SymbolLikeCard key={`${symbol.symbol}-${symbol.symbolId}-${index}`} symbol={symbol} />
      ))}
    </>
  );
}

export default SymbolLikeCardList;
