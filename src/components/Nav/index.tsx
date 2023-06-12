'use client';

import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { NavItemData } from '@/constants/NavItemData';

export default function Navbar() {
  const pathname = usePathname();
  const notRenderNavItem = pathname !== '/signup' && pathname !== '/login';

  return (
    <div className="fixed bottom-0 mb-4 flex w-screen justify-between text-center">
      {notRenderNavItem && NavItemData.map((navItem) => <NavItem navItem={navItem} key={navItem.pathName} />)}
    </div>
  );
}
