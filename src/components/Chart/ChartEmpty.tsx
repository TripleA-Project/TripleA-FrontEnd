'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import type { GetSymbolStockResponse } from '@/interfaces/Dto/Stock';
import { MdOutlineRefresh } from 'react-icons/md';
import { AppLogos } from '../Icons';

interface ChartEmptyProps {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<GetSymbolStockResponse, unknown>>;
}

function ChartEmpty({ refetch }: ChartEmptyProps) {
  const { refresh } = useRouter();

  return (
    <div className="flex h-[322px] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <AppLogos.Orange />
        <p className={`font-bold text-[#9AA1A9]`}>차트 데이터가 없습니다</p>
      </div>
      <button
        className={`group box-border flex items-center justify-center gap-1 rounded-2xl px-2 py-1 text-[#FFA500] transition-colors hover:bg-[#FFA500]`}
        onClick={async () => {
          refresh();
          refetch();
        }}
      >
        <MdOutlineRefresh className={`text-xl group-hover:animate-[rotateOut_300ms] group-hover:text-white`} />
        <p className="font-bold group-hover:text-white">다시 시도</p>
      </button>
    </div>
  );
}

export default ChartEmpty;
