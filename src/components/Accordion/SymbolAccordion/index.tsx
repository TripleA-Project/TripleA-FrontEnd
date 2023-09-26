'use client';

import React from 'react';
import Accordion from '..';
import Link from 'next/link';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { AppIcons } from '@/components/Icons';
import { useLikedSymbols } from '@/hooks/useLikedSymbols';

function SymbolAccordion() {
  const { likedSymbols, status } = useLikedSymbols();

  return (
    <Accordion
      summary={
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">관심 심볼</span>
          <Link href="/mypage/edit/symbol" onClick={(e) => e.stopPropagation()}>
            <AppIcons.Edit />
          </Link>
        </div>
      }
      detail={
        <div className="flex max-h-[252px] w-max flex-col gap-3 overflow-auto scrollbar-none">
          {status === 'loading' ? (
            <>
              {Array.from({ length: 3 }).map((_, idx) => (
                <SymbolChip key={idx} loading />
              ))}
            </>
          ) : null}
          {likedSymbols?.symbols ? (
            <>
              {likedSymbols.symbols.map((symbol, idx) => {
                return <SymbolChip key={`${symbol.symbol}-${symbol.companyName}-${idx}`} symbol={symbol} selected />;
              })}
            </>
          ) : null}
        </div>
      }
    />
  );
}

export default SymbolAccordion;
