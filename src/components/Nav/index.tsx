'use client';

import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { NavItemData } from '@/constants/NavItemData';

function Nav() {
  const pathname = usePathname();
  const notRenderNav = pathname !== '/signup' && pathname !== '/login';

  return (
    <div
      className={`fixed bottom-0 flex w-screen justify-between p-3 text-center ${
        notRenderNav && 'border-t-[1px] border-t-[#E8E8E8]'
      } bg-[#ffff]`}
    >
      {notRenderNav && NavItemData.map((navItem) => <NavItem navItem={navItem} key={navItem.pathName} />)}
    </div>
  );
}

export default Nav;
