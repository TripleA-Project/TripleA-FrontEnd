'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Button from '../Button/Button';
import { setSymbolChartPageResampleFrequencyTab, usePageTab } from '@/redux/slice/pageTabSlice';
import type { ResampleFrequency } from '@/interfaces/Dto/Stock';

interface ChartResampleGroupProps {
  symbol: string;
}

function ChartResampleGroup({ symbol }: ChartResampleGroupProps) {
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const queryStringResample = (searchParams.get('resample') || 'daily') as ResampleFrequency;

  const { dispatch, pageTabs } = usePageTab();

  const selectedResample =
    queryStringResample !== pageTabs.symbolChartPageResampleFrequencyTab
      ? queryStringResample
      : pageTabs.symbolChartPageResampleFrequencyTab;

  if (queryStringResample !== pageTabs.symbolChartPageResampleFrequencyTab) {
    dispatch(setSymbolChartPageResampleFrequencyTab(selectedResample));
  }

  const tabClassNames = `w-full h-full rounded-[4px] hover:bg-[#9AA1A9] hover:text-white bg-transparent`;

  const activeClassNames = {
    content: `bg-[#9AA1A9] text-white`,
  };

  const classNames = {
    tabContainer: twMerge([`h-[40px] box-border flex divide-x-2 divide-white rounded-lg bg-[#F5F7F9] p-1.5`]),
    tabWrapper: twMerge([`flex-1`]),
    monthlyTab: twMerge([tabClassNames, selectedResample === 'monthly' && activeClassNames.content]),
    weeklyTab: twMerge([tabClassNames, selectedResample === 'weekly' && activeClassNames.content]),
    dailyTab: twMerge([tabClassNames, selectedResample === 'daily' && activeClassNames.content]),
  };

  function tab(resample: ResampleFrequency) {
    dispatch(setSymbolChartPageResampleFrequencyTab(resample));

    push(`/chart/symbol?name=${symbol}&resample=${resample}`);
  }

  return (
    <div className={classNames.tabContainer}>
      <div className={classNames.tabWrapper} onClick={() => tab('monthly')}>
        <Button className={classNames.monthlyTab} bgColorTheme="gray" textColorTheme="black">
          월
        </Button>
      </div>
      <div className={classNames.tabWrapper} onClick={() => tab('weekly')}>
        <Button className={classNames.weeklyTab} bgColorTheme="gray" textColorTheme="black">
          주
        </Button>
      </div>
      <div className={classNames.tabWrapper} onClick={() => tab('daily')}>
        <Button className={classNames.dailyTab} bgColorTheme="gray" textColorTheme="black">
          일
        </Button>
      </div>
    </div>
  );
}

export default ChartResampleGroup;
