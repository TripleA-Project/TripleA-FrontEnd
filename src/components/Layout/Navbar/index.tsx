'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavIcons } from './NavIcons';

export type NavPaths = 'Home' | 'Chart' | 'Search' | 'History' | 'Mypage';

const shouldHiddenPaths = [
  '/login',
  '/signup',
  '/mypage/edit/symbol',
  '/mypage/edit/category',
  '/mypage/membership/with-drawal',
];

function Navbar() {
  const pathName = usePathname();

  return !shouldHiddenPaths.includes(pathName!) ? (
    <nav className={`fixed_inner fixed bottom-0 z-10 w-full bg-white !p-0`}>
      <ul className="mx-auto box-border flex max-w-screen-pc items-center justify-between px-8 py-3 mobile:min-w-[390px]">
        <li>
          <Link href="/" className="flex flex-col items-center justify-center">
            <NavIcons.Home active={pathName === '/' || pathName?.startsWith('/detail')} />
            <span
              className={`text-[9px] font-bold ${
                pathName === '/' || pathName?.startsWith('/detail') ? 'text-black' : 'text-[#C6C6C6]'
              }`}
            >
              홈
            </span>
          </Link>
        </li>
        <li>
          <Link href="/chart" className="flex flex-col items-center justify-center">
            <NavIcons.Chart active={pathName?.startsWith('/chart')} />
            <span
              className={`text-[9px] font-bold ${pathName?.startsWith('/chart') ? 'text-black' : 'text-[#C6C6C6]'}`}
            >
              차트
            </span>
          </Link>
        </li>
        <li>
          <Link href="/search" className="flex flex-col items-center justify-center">
            <NavIcons.Search active={pathName?.startsWith('/search')} />
            <span
              className={`text-[9px] font-bold ${pathName?.startsWith('/search') ? 'text-black' : 'text-[#C6C6C6]'}`}
            >
              검색
            </span>
          </Link>
        </li>
        <li>
          <Link href="/history" className="flex flex-col items-center justify-center">
            <NavIcons.History active={pathName === '/history'} />
            <span className={`text-[9px] font-bold ${pathName === '/history' ? 'text-black' : 'text-[#C6C6C6]'}`}>
              내가 본
            </span>
          </Link>
        </li>
        <li>
          <Link href="/mypage" className="flex flex-col items-center justify-center">
            <NavIcons.Mypage active={pathName?.startsWith('/mypage')} />
            <span
              className={`text-[9px] font-bold ${pathName?.startsWith('/mypage') ? 'text-black' : 'text-[#C6C6C6]'}`}
            >
              MY
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  ) : null;
}

export default Navbar;
