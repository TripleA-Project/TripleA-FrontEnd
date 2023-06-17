'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons/lib';

interface NavItemProps {
  navItem: {
    pathName: string;
    name: string;
    Icon: IconType;
  };
}

 function NavItem({ navItem }: NavItemProps) {
  const pathName = usePathname();

  return (
    <div key={navItem.pathName} className="mx-auto">
      <Link href={navItem.pathName} className={`${pathName === navItem.pathName ? 'text-black' : 'text-neutral-400'}`}>
        <div className="h-10 w-10">
          <navItem.Icon className="mx-auto text-center text-xl" />
          <span className="text-center text-[10px] font-bold">{navItem.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default NavItem