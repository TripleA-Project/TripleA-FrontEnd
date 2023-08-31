'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type ChartTabPage } from '.';

function Tabs() {
  const searchParams = useSearchParams();
  const tabParams = searchParams?.get('tab');
  const tab: ChartTabPage = !tabParams
    ? 'likeSymbol'
    : !!tabParams && tabParams === 'recommandSymbol'
    ? 'recommandSymbol'
    : 'likeSymbol';

  return (
    <>
      <div className="flex w-full">
        <Link href={'/chart'} className="relative box-border flex-1 shrink-0 px-1.5 py-2 text-center">
          <div className={`font-semibold ${tab === 'likeSymbol' ? 'text-black' : 'text-[#969696]'}`}>
            내 관심 종목
            <div
              className={`absolute ${
                tab === 'likeSymbol' ? 'bg-black' : 'bg-[#9AA1A9]'
              } bottom-0 left-0 h-[1px] w-full`}
            />
          </div>
        </Link>
        <Link href="/chart?tab=recommandSymbol" className="relative box-border flex-1 shrink-0 px-1.5 py-2 text-center">
          <div className={`font-semibold ${tab === 'recommandSymbol' ? 'text-black' : 'text-[#969696]'}`}>
            인기종목
            <div
              className={`absolute ${
                tab === 'recommandSymbol' ? 'bg-black' : 'bg-[#9AA1A9]'
              } bottom-0 left-0 h-[1px] w-full`}
            />
          </div>
        </Link>
      </div>
    </>
  );
}

export default Tabs;
