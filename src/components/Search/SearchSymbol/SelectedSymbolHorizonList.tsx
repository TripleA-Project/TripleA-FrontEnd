'use client';

import React from 'react';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { unSelectSymbol, useSymbolList } from '@/redux/slice/symbolSlice';
import { type SearchedSymbol } from '@/interfaces/Symbol';

interface SelectedSymbolHorizonListProps {
  symbols: SearchedSymbol[];
  shadowEffect?: boolean;
  closeButton?: boolean;
  loading?: boolean;
}

function SelectedSymbolHorizonList({ symbols, shadowEffect, closeButton, loading }: SelectedSymbolHorizonListProps) {
  const { dispatch, isLike } = useSymbolList();

  if (loading) {
    return (
      <div
        className="animate__animated animate__fadeIn flex items-center gap-1 overflow-scroll scrollbar-none"
        onWheel={(e) => e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY })}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SymbolChip key={`horizonSymbol-loading-${index}`} loading />
        ))}
      </div>
    );
  }

  return (
    <div
      className="animate__animated animate__fadeIn flex min-h-[36px] items-center gap-1 overflow-scroll scrollbar-none"
      onWheel={(e) => e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY })}
    >
      {symbols.length
        ? symbols.map((symbol, idx) => {
            return (
              <SymbolChip
                key={`${symbol.symbol.toUpperCase()}-${symbol.symbolId}-${idx}`}
                symbol={symbol}
                shadowEffect={shadowEffect}
                closeButton={closeButton}
                selected={isLike(symbol)}
                onClose={() => {
                  dispatch(unSelectSymbol({ symbol }));
                }}
              />
            );
          })
        : null}
    </div>
  );
}

export default SelectedSymbolHorizonList;
