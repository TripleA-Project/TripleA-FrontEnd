'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export interface AdminNavItemType {
  active: boolean;
  icon: React.ReactNode;
  href: string;
  text: string;
}

interface AdminNavItemProps extends AdminNavItemType {}

function AdminNavItem({ active, icon, href, text }: AdminNavItemProps) {
  const classNames = twMerge([
    'flex flex-col items-center justify-center text-2xl text-[#C6C6C6]',
    active && 'text-black',
  ]);

  return (
    <li>
      <Link href={href} className={classNames}>
        {icon}
        <span className={`text-[9px] font-bold leading-normal`}>{text}</span>
      </Link>
    </li>
  );
}

export default AdminNavItem;
