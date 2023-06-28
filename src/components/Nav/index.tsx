'use client';

import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { NavItemData } from '@/constants/NavItemData';

function Nav() {
  const pathname = usePathname();
  const notRenderNav = pathname !== '/signup' && pathname !== '/login';

  return (
    <div
      className={` fixed bottom-0 left-0 z-[100] flex w-screen justify-between bg-[#fff] py-3 text-center  ${
        notRenderNav && 'border-t-[1px] border-t-[#E8E8E8]'
      }`}
    >
      {notRenderNav && NavItemData.map((navItem) => <NavItem navItem={navItem} key={navItem.pathName} />)}
    </div>
  );
}

export default Nav;
