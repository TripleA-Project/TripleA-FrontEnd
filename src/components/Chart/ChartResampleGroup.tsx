'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../Button/Button';

interface ChartResampleGroupProps {
  symbol: string;
}

function ChartResampleGroup({ symbol }: ChartResampleGroupProps) {
  const resample = useSearchParams()?.get('resample');

  return (
    <div className="box-border flex divide-x-2 divide-white rounded-lg bg-[#F5F7F9] p-1.5">
      <Link href={`/chart/symbol?name=${symbol.toUpperCase()}&resample=monthly`} className={`flex-1`}>
        <Button
          className={`!w-full !rounded-[4px] hover:!bg-[#9AA1A9] hover:!text-white ${
            resample === 'monthly' ? '!bg-[#9AA1A9] text-white' : '!bg-transparent'
          }`}
          bgColorTheme="gray"
          textColorTheme="black"
        >
          월
        </Button>
      </Link>
      <Link href={`/chart/symbol?name=${symbol.toUpperCase()}&resample=weekly`} className={`flex-1`}>
        <Button
          className={`!w-full !rounded-[4px] hover:!bg-[#9AA1A9] hover:!text-white ${
            resample === 'weekly' ? '!bg-[#9AA1A9] text-white' : '!bg-transparent'
          }`}
          bgColorTheme="gray"
          textColorTheme="black"
        >
          주
        </Button>
      </Link>
      <Link href={`/chart/symbol?name=${symbol.toUpperCase()}&resample=daily`} className={`flex-1`}>
        <Button
          className={`!w-full !rounded-[4px] hover:!bg-[#9AA1A9] hover:!text-white ${
            resample === 'daily' || !resample ? '!bg-[#9AA1A9] text-white' : '!bg-transparent'
          }`}
          bgColorTheme="gray"
          textColorTheme="black"
        >
          일
        </Button>
      </Link>
    </div>
  );
}

export default ChartResampleGroup;
