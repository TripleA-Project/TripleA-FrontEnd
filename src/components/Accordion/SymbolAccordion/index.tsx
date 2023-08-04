'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Accordion from '..';
import Link from 'next/link';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { AppIcons } from '@/components/Icons';
import { getLikeSymbol } from '@/service/symbol';

function SymbolAccordion() {
  const { data: likedSymbol, status: likedSymbolStatus } = useQuery(['likedSymbolList'], () => getLikeSymbol(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(payload) {
      return payload.data;
    },
  });

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
        <div className="flex w-max flex-col gap-3">
          {likedSymbolStatus === 'loading' ? (
            <>
              {Array.from({ length: 3 }).map((_, idx) => (
                <SymbolChip key={idx} loading />
              ))}
            </>
          ) : null}
          {likedSymbol?.data ? (
            <>
              {likedSymbol.data.map((symbol, idx) => {
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
