'use client';
import IconButton, { IconButtonProps } from '@/components/Button/IconButton';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface RightIconProps {
  clickHandle: () => void;
  rightIcon: IconButtonProps['icon'];
}

function RightIcon({ clickHandle, rightIcon }: RightIconProps) {
  const [isClicked, setIsClicked] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const params = useParams();
  const iconClickHandle = () => {
    if (pathName === '/chart') {
      router.push('/search');
    }
    if (pathName === '/') {
      router.push('/search');
    }
    if (pathName === `/chart/symbol`) {
      setIsClicked(!isClicked);
    }
    if (pathName === '/search') {
      clickHandle();
    }
  };
  return (
    <div
      className={`${
        pathName === `/chart/symbol` && isClicked
          ? 'text-[#FD954A]'
          : pathName === `/chart/symbol?${params.name}` || (pathName === '/search' && 'text-neutral-400')
      }`}
    >
      <IconButton
        icon={rightIcon}
        textColorTheme="none"
        bgColorTheme="none"
        sizeTheme="icon"
        iconSize="30px"
        onClick={iconClickHandle}
      />
    </div>
  );
}

export default RightIcon;
