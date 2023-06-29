<<<<<<< HEAD
//
=======
'use client';

import { usePathname } from 'next/navigation';
import LeftIcon from '../common/LeftIcon';
import { useEffect, useState } from 'react';
import RightIcon from '../common/RightIcon';
import Title from '../common/Title';
import { HeaderProps } from '..';

function HeaderItem({ leftIcon, rightIcon, title }: HeaderProps) {
  const pathName = usePathname();
  const [isClicked, setIsClicked] = useState(false);

  const clickHandle = () => {
    setIsClicked(!isClicked);
    if (pathName === '/') {
    }
  };

  useEffect(() => {
    setIsClicked(false);
  }, [pathName]);

  return (
    <div className={`p-3 ${pathName === '/search' ? 'border-b-[1px] border-b-[#FD954A]' : ''}`}>
      <div
        className={`flex ${
          pathName === '/login' || pathName === '/read'
            ? ' item-center justify-center'
            : ' relative  items-center justify-between text-2xl'
        } `}
      >
        {leftIcon && <LeftIcon leftIcon={leftIcon} clickHandle={clickHandle} />}

        {title && <Title title={title} />}
        {rightIcon && <RightIcon rightIcon={rightIcon} clickHandle={clickHandle} />}
      </div>
    </div>
  );
}

export default HeaderItem;
>>>>>>> 4d3ade8d4532286a09dbb4d59e2a8b6d93fb8419
