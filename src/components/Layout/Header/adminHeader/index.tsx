'use client';

import { AppLogos } from '@/components/Icons';
import Header from '..';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PostNoticeHeader from '../PostNoticeHeader';
import { twMerge } from 'tailwind-merge';

interface AdminHeaderMenu {
  href?: string;
  menuItem: React.ReactNode;
  active: boolean;
}

interface AdminHeaderMenuList {
  active: boolean;
  menuList: AdminHeaderMenu[];
}

function AdminHeader() {
  const pathName = usePathname();

  if (pathName.includes('/admin/notice/post')) return <PostNoticeHeader />;

  return (
    <Header fixed headerClassName={'border-b border-b-[#E5E7EC] shadow-[0px_1px_4px_-2px_rgba(0,0,0,.3)]'}>
      <AppLogos.Orange className="shrink-0" />
      <AdminHeader.Menu />
      <Link
        href="/"
        className="shrink-0 rounded-lg bg-orange-400 px-2 py-0.5 text-sm text-white transition-colors duration-200 hover:bg-orange-500"
      >
        TripleA로 이동
      </Link>
    </Header>
  );
}

export default AdminHeader;

AdminHeader.Menu = function AdminHeaderMenu() {
  const pathName = usePathname();

  const adminHeaderMenuList: AdminHeaderMenuList[] = [
    {
      active: pathName === '/admin/notice',
      menuList: [
        {
          href: '/admin/notice',
          menuItem: '공지사항 보기',
          active: pathName === '/admin/notice',
        },
        {
          href: '/admin/notice/post',
          menuItem: '공지사항 작성',
          active: pathName === '/admin/notice/post',
        },
      ],
    },
  ];

  const activeMenuList = adminHeaderMenuList.find((menu) => menu.active);

  return activeMenuList ? (
    <ul className={`box-border flex flex-1 items-center gap-3 px-2 text-sm font-bold`}>
      {activeMenuList.menuList.map((menu, index) => {
        return <AdminHeader.MenuItem key={index} {...menu} />;
      })}
    </ul>
  ) : null;
};

AdminHeader.MenuItem = function AdminHeaderMenuItem({ active, menuItem, href }: AdminHeaderMenu) {
  const classNames = twMerge([
    'text-[#C6C6C6] hover:text-[#2e2e2e] transition-colors duration-200',
    active && 'text-black underline underline-offset-4',
  ]);

  if (href)
    return (
      <li className={classNames}>
        <Link href={href}>{menuItem}</Link>
      </li>
    );

  return <li className={classNames}>{menuItem}</li>;
};
