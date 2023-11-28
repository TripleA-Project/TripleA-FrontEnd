'use client';

import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setMainPageTab, usePageTab } from '@/redux/slice/pageTabSlice';
import { ErrorNotification } from '@/components/Notification';
import { NotificationTemplate } from '@/constants/notification';
import SetInterestsPortal from '@/components/SetInterestsModal/SetInterestsPortal';
import { useLikes } from '@/hooks/useLikes';
import { twMerge } from 'tailwind-merge';
import type { MainPageNewsTab } from '.';

function Tabs() {
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const queryStringTab = (searchParams.get('tab') || 'latestNews') as MainPageNewsTab;

  const { likedSymbols, likedCategories, status, loginRequired } = useLikes();
  const { dispatch, pageTabs } = usePageTab();

  const [openSetInterestModal, setOpenSetInterestModal] = useState(false);
  const [notification, setNotification] = useState<{
    active: boolean;
    dimHeight: number;
    content: string;
    buttonText: string;
    linkURL: string;
  }>({
    active: false,
    dimHeight: 0,
    content: '',
    buttonText: '',
    linkURL: '',
  });

  const ref = useRef<HTMLDivElement>(null);

  const selectedTab = notification.active
    ? pageTabs.mainPageTab
    : queryStringTab !== pageTabs.mainPageTab
    ? queryStringTab
    : pageTabs.mainPageTab;

  const activeTabClassNames = {
    content: 'text-black',
    bottomLine: 'bg-black',
  };

  const classNames = {
    tabContainer: twMerge([`mx-auto flex w-[70%] items-center justify-between`]),
    latestNewsTab: {
      content: twMerge([
        `relative font-semibold box-border w-[87px] cursor-pointer px-1.5 py-2 text-center text-[#969696] transition-colors duration-200`,
        selectedTab === 'latestNews' && activeTabClassNames.content,
      ]),
      bottomLine: twMerge([
        `absolute bottom-0 left-0 h-1 w-full rounded-lg`,
        selectedTab === 'latestNews' && activeTabClassNames.bottomLine,
        selectedTab !== 'latestNews' && 'hidden',
      ]),
    },
    interestNewsTab: {
      content: twMerge([
        `relative font-semibold box-border w-[87px] cursor-pointer px-1.5 py-2 text-center text-[#969696] transition-colors duration-200`,
        selectedTab === 'interestNews' && activeTabClassNames.content,
      ]),
      bottomLine: twMerge([
        `absolute bottom-0 left-0 h-1 w-full rounded-lg`,
        selectedTab === 'interestNews' && activeTabClassNames.bottomLine,
        selectedTab !== 'interestNews' && 'hidden',
      ]),
    },
  };

  function getDimHeight() {
    if (!ref.current) return 0;

    return ref.current.getBoundingClientRect().bottom + 4;
  }

  function tab(tabName: MainPageNewsTab) {
    dispatch(setMainPageTab(tabName));

    switch (tabName) {
      case 'latestNews':
        setNotification((prev) => ({
          ...prev,
          active: false,
          dimHeight: 0,
          content: '',
          buttonText: '',
          linkURL: '',
        }));

        push('/');

        return;
      case 'interestNews':
        if (loginRequired) {
          setNotification((prev) => ({
            ...prev,
            active: true,
            dimHeight: getDimHeight(),
            content: NotificationTemplate.LikeNewsLoginRequired.content,
            buttonText: NotificationTemplate.LikeNewsLoginRequired.buttonText,
            linkURL: NotificationTemplate.LikeNewsLoginRequired.linkURL,
          }));

          return;
        }

        if (status === 'success' && likedSymbols.empty && likedCategories.empty) {
          setNotification((prev) => ({
            ...prev,
            active: true,
            dimHeight: getDimHeight(),
            content: NotificationTemplate.LikeEmpty.content,
            buttonText: NotificationTemplate.LikeEmpty.buttonText,
            linkURL: NotificationTemplate.LikeEmpty.linkURL,
          }));

          return;
        }

        push('/?tab=interestNews');

        return;
    }
  }

  return (
    <>
      <div ref={ref} className={classNames.tabContainer}>
        <div className={classNames.latestNewsTab.content} onClick={() => tab('latestNews')}>
          전체 뉴스
          <div className={classNames.latestNewsTab.bottomLine} />
        </div>
        <div
          id="news-tab__interest"
          className={classNames.interestNewsTab.content}
          onClick={() => {
            tab('interestNews');
          }}
        >
          관심 뉴스
          <div className={classNames.interestNewsTab.bottomLine} />
        </div>
      </div>
      <ErrorNotification
        dimHeight={notification.dimHeight}
        active={notification.active}
        content={notification.content}
        buttonText={notification.buttonText}
        linkURL={notification.linkURL}
        closeOnClick
        onClose={(from) => {
          setNotification((prev) => ({
            ...prev,
            active: false,
            dimHeight: 0,
            content: '',
            buttonText: '',
            linkURL: '',
          }));

          dispatch(setMainPageTab('latestNews'));

          if (notification.linkURL === '' && from === 'button') {
            setTimeout(() => {
              setOpenSetInterestModal(true);
            }, 100);
          }
        }}
      />
      {openSetInterestModal ? (
        <SetInterestsPortal
          onClose={() => {
            setOpenSetInterestModal(false);
          }}
        />
      ) : null}
    </>
  );
}

export default Tabs;
