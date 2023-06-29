'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
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
  const params = useParams();

  const isExactMatch = pathName === navItem.pathName;
  const isSubpathMatch = pathName.startsWith(`${navItem.pathName}/`);
  const isDynamicMatch = navItem.pathName === `/` && pathName.startsWith(`/detail`);

  const isActive = isExactMatch || isSubpathMatch || isDynamicMatch ? 'text-black' : 'text-neutral-400';
  return (
    <div key={navItem.pathName} className="mx-auto">
      <Link href={navItem.pathName} className={`${isActive}`}>
        <div className="h-10 w-10">
          <navItem.Icon className="mx-auto text-center text-xl" />
          <span className="text-center text-[10px] font-bold">{navItem.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default NavItem;
