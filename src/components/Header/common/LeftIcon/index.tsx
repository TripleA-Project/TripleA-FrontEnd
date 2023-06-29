'use client';
import IconButton, { IconButtonProps } from '@/components/Button/IconButton';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import LogoIcon from '../../../../../public/Logo.svg';

interface leftIconProps {
  clickHandle: () => void;
  leftIcon: IconButtonProps['icon'] | 'LogoIcon';
}
function LeftIcon({ leftIcon }: leftIconProps) {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();
  const iconClickHandle = () => {
    if (pathName === `/chart/symbol`) router.push('/chart');
  };
  return (
    <div
      className={`${pathName === '/chart' || pathName === '/login' ? 'text-[#FD954A]' : ''} ${
        pathName === `/chart/symbol` || pathName === '/search' ? 'text-neutral-400' : ''
      }`}
    >
      {leftIcon === 'LogoIcon' ? (
        <Image src={LogoIcon} alt="logo icon" />
      ) : (
        <IconButton
          icon={leftIcon}
          textColorTheme="none"
          bgColorTheme="none"
          sizeTheme="icon"
          iconSize="30px"
          onClick={iconClickHandle}
        />
      )}
    </div>
  );
}

export default LeftIcon;
