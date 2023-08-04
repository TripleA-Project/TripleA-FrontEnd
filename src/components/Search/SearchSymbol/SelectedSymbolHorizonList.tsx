'use client';

import React from 'react';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { unSelectSymbol, useSymbolList } from '@/redux/slice/symbolSlice';
import { type SearchedSymbol } from '@/interfaces/Symbol';

interface SelectedSymbolHorizonListProps {
  symbols: SearchedSymbol[];
  shadowEffect?: boolean;
  closeButton?: boolean;
}

function SelectedSymbolHorizonList({ symbols, shadowEffect, closeButton }: SelectedSymbolHorizonListProps) {
  const { dispatch, isLike } = useSymbolList();

  return symbols.length ? (
    <div
      className="flex items-center gap-1 overflow-scroll scrollbar-none"
      onWheel={(e) => e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY })}
    >
      {symbols.map((symbol, idx) => {
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
      })}
    </div>
  ) : null;
}

export default SelectedSymbolHorizonList;
