'use client';

import { usePathname } from 'next/navigation';
import LeftIcon from '../common/LeftIcon';
import { useEffect, useState } from 'react';
import RightIcon from '../common/RightIcon';
import Title from '../common/Title';
import ActionInput from '@/components/ActionInput/ActionInput';
import { HeaderProps } from '..';


function HeaderItem({leftIcon,rightIcon, title} : HeaderProps) {
  const pathName = usePathname();

  const [isClicked, setIsClicked] = useState(false);
  const clickHandle = () => {
      setIsClicked(!isClicked);
  };

  useEffect(()=>{
   setIsClicked(false) 
  },[pathName])

  return (
    <div className="px-5 my-3 w-screen ">
      {(isClicked && pathName === '/') || (isClicked && pathName === '/chart') || pathName === '/search' ? (
        <ActionInput type="mainSearch" onClick={clickHandle} />
      ) : (
        <div className="relative flex items-center justify-between text-2xl">
          {leftIcon && <LeftIcon leftIcon={leftIcon} clickHandle={clickHandle}/>}
          {title && <Title title={title}/>}
          {rightIcon && <RightIcon rightIcon={rightIcon}clickHandle={clickHandle} />}
        </div>
      )}
    </div>
  );
}

export default HeaderItem;
