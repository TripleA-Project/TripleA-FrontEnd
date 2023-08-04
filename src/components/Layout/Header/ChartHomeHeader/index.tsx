'use client';

import Link from 'next/link';
import Header from '@/components/Layout/Header';
import { AppIcons, AppLogos } from '@/components/Icons';

function ChartHomeHeader() {
  return (
    <>
      <Header fixed headerClassName="!h-[52px] flex justify-between" className="w-full">
        <div className="flex shrink-0 items-center gap-2">
          <AppLogos.Black />
          <span className="text-[25px] font-bold text-[#131F3C]">차트</span>
        </div>
        <div className="flex shrink-0 items-center">
          <Link href={'/search'}>
            <AppIcons.Search className="shrink-0 text-xl text-[#373737]" />
          </Link>
        </div>
      </Header>
    </>
  );
}

export default ChartHomeHeader;
