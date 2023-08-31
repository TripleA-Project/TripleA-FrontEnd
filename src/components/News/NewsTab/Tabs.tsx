'use client';

import { useEffect, useRef, useState } from 'react';
import { ErrorNotification } from '@/components/Notification';
import { NotificationTemplate } from '@/constants/notification';
import { type TabPage } from '.';
import SetInterestsPortal from '@/components/SetInterestsModal/SetInterestsPortal';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLikes } from '@/hooks/useLikes';

function Tabs() {
  const searchParams = useSearchParams();
  const tabParams = searchParams?.get('tab');
  const tab: TabPage = !tabParams ? 'latestNews' : !!tabParams && tabParams === 'interest' ? 'likeNews' : 'latestNews';

  const [tabPage, setTabPage] = useState<TabPage>(tab);

  const ref = useRef<HTMLDivElement>(null);

  const { push } = useRouter();
  const { status, empty, loginRequired } = useLikes();

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

  function handleTab() {
    function getDimHeight() {
      if (!ref.current) return 0;

      return ref.current.getBoundingClientRect().bottom + 4;
    }

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

    if (status === 'success' && empty) {
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

    push('/?tab=interest');
  }

  useEffect(() => {
    const tab: TabPage = !tabParams
      ? 'latestNews'
      : !!tabParams && tabParams === 'interest'
      ? 'likeNews'
      : 'latestNews';

    setTabPage(tab);
  }, [tabParams]);

  return (
    <>
      <div ref={ref} className="mx-auto flex w-[70%] items-center justify-between">
        <Link
          href={'/'}
          onClick={() => {
            setNotification((prev) => ({
              ...prev,
              active: false,
              dimHeight: 0,
              content: '',
              buttonText: '',
              linkURL: '',
            }));
            setTabPage('latestNews');
          }}
        >
          <div
            className={`relative font-semibold ${
              tabPage === 'latestNews' ? 'text-black' : 'text-[#969696]'
            } box-border w-[87px] cursor-pointer px-1.5 py-2 text-center`}
          >
            전체 뉴스
            {tabPage === 'latestNews' ? (
              <div className="absolute bottom-0 left-0 h-1 w-full rounded-lg bg-black" />
            ) : null}
          </div>
        </Link>
        <div
          className={`relative font-semibold ${
            tabPage === 'likeNews' ? 'text-black' : 'text-[#969696]'
          } box-border w-[87px] cursor-pointer px-1.5 py-2 text-center`}
          onClick={() => {
            setTabPage('likeNews');
            handleTab();
          }}
        >
          관심 뉴스
          {tabPage === 'likeNews' ? <div className="absolute bottom-0 left-0 h-1 w-full rounded-lg bg-black" /> : null}
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

          setTabPage('latestNews');

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
