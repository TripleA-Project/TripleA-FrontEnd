'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { NavIcons } from './NavIcons';

export type NavPaths = 'Home' | 'Chart' | 'Search' | 'History' | 'Mypage';

const shouldHiddenPaths = [
  '/login',
  '/signup',
  '/mypage/edit/symbol',
  '/mypage/edit/category',
  '/mypage/membership/with-drawal',
];

const isAdminPath = (path: string) => {
  return path.startsWith('/admin/');
};

function Navbar() {
  const pathName = usePathname();
  const today = dayjs();

  const activeOf = {
    home: pathName === '/' || pathName?.startsWith('/detail'),
    chart: pathName?.startsWith('/chart'),
    search: pathName?.startsWith('/search'),
    history: pathName === '/history',
    myPage: pathName?.startsWith('/mypage'),
  };

  const classNames = {
    tabWrapper: twMerge([`flex flex-col items-center justify-center`]),
    tabText: `text-[9px] font-bold text-[#C6C6C6]`,
    active: {
      text: `text-black`,
    },
    get homeTab() {
      return { text: twMerge([this.tabText, activeOf.home && this.active.text]) };
    },
    get chartTab() {
      return { text: twMerge([this.tabText, activeOf.chart && this.active.text]) };
    },
    get searchTab() {
      return { text: twMerge([this.tabText, activeOf.search && this.active.text]) };
    },
    get historyTab() {
      return { text: twMerge([this.tabText, activeOf.history && this.active.text]) };
    },
    get myPageTab() {
      return { text: twMerge([this.tabText, activeOf.myPage && this.active.text]) };
    },
  };

  return !shouldHiddenPaths.includes(pathName) && !isAdminPath(pathName) ? (
    <nav className={`fixed_inner fixed bottom-0 z-10 w-full bg-white !p-0`}>
      <ul className="mx-auto box-border flex max-w-screen-pc items-center justify-between px-8 py-3 mobile:min-w-[390px]">
        <li>
          <Link href="/" className={classNames.tabWrapper}>
            <NavIcons.Home active={activeOf.home} />
            <span className={classNames.homeTab.text}>홈</span>
          </Link>
        </li>
        <li>
          <Link href="/chart" className={classNames.tabWrapper}>
            <NavIcons.Chart active={activeOf.chart} />
            <span className={classNames.chartTab.text}>차트</span>
          </Link>
        </li>
        <li>
          <Link href="/search" className={classNames.tabWrapper}>
            <NavIcons.Search active={activeOf.search} />
            <span className={classNames.searchTab.text}>검색</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/history?year=${today.format('YYYY')}&month=${today.format('M')}`}
            className={classNames.tabWrapper}
          >
            <NavIcons.History active={activeOf.history} />
            <span className={classNames.historyTab.text}>내가 본</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage" className={classNames.tabWrapper}>
            <NavIcons.Mypage active={activeOf.myPage} />
            <span className={classNames.myPageTab.text}>MY</span>
          </Link>
        </li>
      </ul>
    </nav>
  ) : null;
}

export default Navbar;
