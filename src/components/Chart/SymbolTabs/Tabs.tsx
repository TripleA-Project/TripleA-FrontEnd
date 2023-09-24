'use client';

import { useLayoutEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setChartPageHomeTab, usePageTab } from '@/redux/slice/pageTabSlice';
import { twMerge } from 'tailwind-merge';
import type { ChartHomeTab } from '../ChartPageHome';

function Tabs() {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const { dispatch, pageTabs } = usePageTab();

  const activeTabClassNames = {
    content: 'text-black',
    bottomLine: 'bg-black',
  };

  const classNames = {
    tabContainer: twMerge([`flex w-full`]),
    tabWrapper: twMerge([`relative box-border flex-1 shrink-0 cursor-pointer px-1.5 py-2 text-center`]),
    likedSymbolsTab: {
      content: twMerge([
        `font-semibold text-[#969696]`,
        pageTabs.chartPageHomeTab === 'likedSymbols' && activeTabClassNames.content,
      ]),
      bottomLine: twMerge([
        `absolute bottom-0 left-0 h-[1px] w-full bg-[#9AA1A9]`,
        pageTabs.chartPageHomeTab === 'likedSymbols' && activeTabClassNames.bottomLine,
      ]),
    },
    recommandSymbolsTab: {
      content: twMerge([
        `font-semibold text-[#969696]`,
        pageTabs.chartPageHomeTab === 'recommandSymbols' && activeTabClassNames.content,
      ]),
      bottomLine: twMerge([
        `absolute bottom-0 left-0 h-[1px] w-full bg-[#9AA1A9]`,
        pageTabs.chartPageHomeTab === 'recommandSymbols' && activeTabClassNames.bottomLine,
      ]),
    },
  };

  const tab = (tabName: ChartHomeTab) => {
    dispatch(setChartPageHomeTab(tabName));

    switch (tabName) {
      case 'likedSymbols':
        push('/chart');

        return;
      case 'recommandSymbols':
        push('/chart?tab=recommandSymbols');

        return;
    }
  };

  useLayoutEffect(() => {
    const urlQueryString = (searchParams.get('tab') || 'likedSymbols') as ChartHomeTab;

    dispatch(setChartPageHomeTab(urlQueryString));
  }, []); /* eslint-disable-line */

  return (
    <>
      <div className={classNames.tabContainer}>
        <div className={classNames.tabWrapper} onClick={() => tab('likedSymbols')}>
          <div className={classNames.likedSymbolsTab.content}>
            내 관심 종목
            <div className={classNames.likedSymbolsTab.bottomLine} />
          </div>
        </div>
        <div className={classNames.tabWrapper} onClick={() => tab('recommandSymbols')}>
          <div className={classNames.recommandSymbolsTab.content}>
            인기종목
            <div className={classNames.recommandSymbolsTab.bottomLine} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabs;
