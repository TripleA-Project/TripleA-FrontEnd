'use client';

import Link from 'next/link';
import { MdTune } from 'react-icons/md';
import Header from '@/components/Layout/Header';
import StockList from '@/components/StockList';
import SetInterestsPortal from '@/components/SetInterestsModal/SetInterestsPortal';
import { useState } from 'react';
import { AppIcons } from '@/components/Icons';

interface NewsHomeHeaderProps {
  isLikeNewsPage: boolean;
}

function NewsHomeHeader({ isLikeNewsPage }: NewsHomeHeaderProps) {
  const [openSetInterestModal, setOpenSetInterestModal] = useState(false);

  const scrollDownHandler = (element: HTMLElement) => {
    element.style.borderBottom = '1px solid #E4E4E4';
  };

  const scrollUpHandler = (element: HTMLElement) => {
    element.style.borderBottom = 'none';
  };

  return (
    <>
      <Header scrollDownCallback={scrollDownHandler} scrollUpCallback={scrollUpHandler}>
        <StockList />
        <div className={`relative z-[2] flex min-w-max items-center`}>
          <Link href={'/search'} className={`${isLikeNewsPage ? '-translate-x-3 pl-3' : ''} transition duration-500`}>
            <AppIcons.Search className="shrink-0 text-xl text-[#373737]" />
          </Link>
          {isLikeNewsPage ? (
            <button onClick={() => setOpenSetInterestModal(true)}>
              <MdTune className="text-2xl text-[#373737]" />
            </button>
          ) : null}
        </div>
      </Header>
      {openSetInterestModal ? <SetInterestsPortal onClose={() => setOpenSetInterestModal(false)} /> : null}
    </>
  );
}

export default NewsHomeHeader;
