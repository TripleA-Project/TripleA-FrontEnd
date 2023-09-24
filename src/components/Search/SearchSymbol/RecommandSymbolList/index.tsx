'use client';

import React from 'react';
import DispatchSearchSymbolChip from '../DispatchSearchSymbolChip';
import GuardBox from '@/components/UI/GuardBox';
import useRecommandSymbols from '@/hooks/useRecommandSymbols';

interface RecommandSymbolListProps {
  isSyncing?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function RecommandSymbolList({ onDispatch, isSyncing }: RecommandSymbolListProps) {
  const { recommandSymbols } = useRecommandSymbols({ suspense: true });

  if (recommandSymbols.empty) {
    return <p className="text-[#9AA2A9]">요즘 뜨는 종목을 제공할 수 없습니다.</p>;
  }

  return (
    <div className="h-[160px] w-max overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
      <div className="relative flex flex-col gap-3">
        <GuardBox activeGuard={isSyncing} />
        {recommandSymbols.symbols!.map((symbol, idx) => (
          <DispatchSearchSymbolChip
            key={`recommand-${symbol.symbol.toUpperCase()}-${idx}`}
            symbol={symbol}
            allowClickDispatch
            onDispatch={onDispatch}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommandSymbolList;
