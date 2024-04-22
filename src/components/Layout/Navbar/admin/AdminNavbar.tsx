'use client';

import { usePathname } from 'next/navigation';
import AdminNavItem, { AdminNavItemType } from './AdminNavItem';
import { FaChartBar } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import { TfiWrite } from 'react-icons/tfi';

function AdminNavbar() {
  const pathName = usePathname();

  const adminNavList: AdminNavItemType[] = [
    {
      active: pathName === '/admin/dashboard',
      icon: <FaChartBar />,
      href: '/admin/dashboard',
      text: '통계',
    },
    {
      active: pathName === '/admin/users',
      icon: <MdManageAccounts />,
      href: '/admin/users',
      text: '회원 관리',
    },
    {
      active: pathName.startsWith('/admin/notice'),
      icon: <TfiWrite />,
      href: '/admin/notice',
      text: '공지 관리',
    },
  ];

  return (
    <nav className={`fixed_inner fixed bottom-0 z-10 w-full bg-white !p-0`}>
      <ul
        className={`mx-auto box-border flex max-w-screen-pc items-center justify-between px-8 py-3 mobile:min-w-[390px]`}
      >
        {adminNavList.map((navItem) => (
          <AdminNavItem key={navItem.href} {...navItem} />
        ))}
      </ul>
    </nav>
  );
}

export default AdminNavbar;
