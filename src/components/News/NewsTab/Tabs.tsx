'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { setMainPageTab, usePageTab } from '@/redux/slice/pageTabSlice';
import { ErrorNotification } from '@/components/Notification';
import { NotificationTemplate } from '@/constants/notification';
import SetInterestsPortal from '@/components/SetInterestsModal/SetInterestsPortal';
import { useLikes } from '@/hooks/useLikes';
import { twMerge } from 'tailwind-merge';
import type { MainPageNewsTab } from '.';

function Tabs() {
  const searchParams = useSearchParams();
  const queryStringTab = (searchParams.get('tab') || 'latestNews') as MainPageNewsTab;

  const { dispatch, pageTabs } = usePageTab();

  const selectedTab = queryStringTab !== pageTabs.mainPageTab ? queryStringTab : pageTabs.mainPageTab;

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

  const ref = useRef<HTMLDivElement>(null);

  const { push } = useRouter();
  const { likedSymbols, likedCategories, status, loginRequired } = useLikes();

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

  function getDimHeight() {
    if (!ref.current) return 0;

    return ref.current.getBoundingClientRect().bottom + 4;
  }

  useEffect(() => {
    switch (pageTabs.mainPageTab) {
      case 'latestNews':
        setNotification((prev) => ({
          ...prev,
          active: false,
          dimHeight: 0,
          content: '',
          buttonText: '',
          linkURL: '',
        }));

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

      default:
        return;
    }
  }, [pageTabs.mainPageTab]); /* eslint-disable-line */

  return (
    <>
      <div ref={ref} className={classNames.tabContainer}>
        <Link
          href={'/'}
          onClick={() => {
            dispatch(setMainPageTab('latestNews'));
          }}
        >
          <div className={classNames.latestNewsTab.content}>
            전체 뉴스
            <div className={classNames.latestNewsTab.bottomLine} />
          </div>
        </Link>
        <div
          className={classNames.interestNewsTab.content}
          onClick={() => {
            dispatch(setMainPageTab('interestNews'));
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
