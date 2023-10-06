'use client';

import { useLayoutEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setChartPageHomeTab, usePageTab } from '@/redux/slice/pageTabSlice';
import { twMerge } from 'tailwind-merge';
import type { ChartHomeTab } from '../ChartPageHome';

function Tabs() {
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const queryStringTab = (searchParams.get('tab') || 'likedSymbols') as ChartHomeTab;

  const { dispatch, pageTabs } = usePageTab();

  const selectedTab = queryStringTab !== pageTabs.chartPageHomeTab ? queryStringTab : pageTabs.chartPageHomeTab;

  const activeTabClassNames = {
    content: 'text-black',
    bottomLine: 'bg-black',
  };

  const classNames = {
    tabContainer: twMerge([`flex w-full`]),
    tabWrapper: twMerge([`relative box-border flex-1 shrink-0 cursor-pointer px-1.5 py-2 text-center`]),
    likedSymbolsTab: {
      content: twMerge([
        `font-semibold text-[#969696] transition-colors duration-200`,
        selectedTab === 'likedSymbols' && activeTabClassNames.content,
      ]),
      bottomLine: twMerge([
        `absolute bottom-0 left-0 h-[1px] w-full bg-[#9AA1A9] transition-colors duration-200`,
        selectedTab === 'likedSymbols' && activeTabClassNames.bottomLine,
      ]),
    },
    recommandSymbolsTab: {
      content: twMerge([
        `font-semibold text-[#969696] transition-colors duration-200`,
        selectedTab === 'recommandSymbols' && activeTabClassNames.content,
      ]),
      bottomLine: twMerge([
        `absolute bottom-0 left-0 h-[1px] w-full bg-[#9AA1A9] transition-colors duration-200`,
        selectedTab === 'recommandSymbols' && activeTabClassNames.bottomLine,
      ]),
    },
  };

  function tab(tabName: ChartHomeTab) {
    dispatch(setChartPageHomeTab(tabName));

    switch (tabName) {
      case 'likedSymbols':
        push('/chart');

        return;
      case 'recommandSymbols':
        push('/chart?tab=recommandSymbols');

        return;
    }
  }

  useLayoutEffect(() => {
    if (queryStringTab !== pageTabs.chartPageHomeTab) {
      tab(selectedTab);
    }
  }, [selectedTab]); /* eslint-disable-line */

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
