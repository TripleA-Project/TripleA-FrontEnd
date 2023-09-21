'use client';

import React from 'react';
import { selectSymbol, unSelectSymbol, useSymbolList } from '@/redux/slice/symbolSlice';
import SymbolChip, { type OnChipChangeResult, type SymbolChipProps } from '@/components/UI/Chip/SymbolChip';
import { useUser } from '@/hooks/useUser';
import type { SearchedSymbol } from '@/interfaces/Symbol';

interface DispatchSearchSymbolChipProps
  extends Omit<SymbolChipProps, 'symbol' | 'showPrice' | 'onChange' | 'onClose' | 'selected'> {
  symbol: SearchedSymbol;
  allowClickDispatch?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function DispatchSearchSymbolChip({
  symbol,
  shadowEffect,
  closeButton,
  allowClickDispatch,
  onDispatch,
}: DispatchSearchSymbolChipProps) {
  const { dispatch, selectedSymbolMap, isLike } = useSymbolList();

  const { user } = useUser();

  const handleChange: () => Promise<OnChipChangeResult> = async () => {
    try {
      if (!isLike(symbol)) {
        if (user?.membership === 'BASIC' && Object.keys(selectedSymbolMap).length >= 3) {
          onDispatch && onDispatch(true);

          return {
            status: 'error',
            type: 'like',
          };
        }

        dispatch(selectSymbol({ symbol }));

        return {
          status: 'success',
          type: 'like',
        };
      }

      dispatch(unSelectSymbol({ symbol }));

      return {
        status: 'success',
        type: 'unlike',
      };
    } catch (err) {
      return {
        status: 'error',
        type: 'unknown',
      };
    }
  };

  return (
    <SymbolChip
      symbol={symbol}
      selected={isLike(symbol)}
      shadowEffect={shadowEffect}
      closeButton={closeButton}
      onChange={allowClickDispatch ? handleChange : undefined}
      onClose={() => dispatch(unSelectSymbol({ symbol }))}
    />
  );
}

export default DispatchSearchSymbolChip;
