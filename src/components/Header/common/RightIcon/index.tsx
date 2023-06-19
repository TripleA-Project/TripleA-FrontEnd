'use client';
import IconButton, { IconButtonProps } from '@/components/Button/IconButton';

import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

interface RightIconProps {
  clickHandle: () => void;
  rightIcon: IconButtonProps['icon'];
}

function RightIcon({ clickHandle, rightIcon }: RightIconProps) {
  const [isClicked, setIsClicked] = useState(false);
  const pathName = usePathname();
  const params = useParams()
  const iconClickHandle = () => {
    if (pathName === '/' || '/chart') {
      clickHandle();
    }

    if (pathName === `/chart/${params.slug}`) {
      setIsClicked(!isClicked);
    }
  };
  return (
    <div
      className={`${
        pathName === `/chart/${params.slug}` && isClicked
          ? 'text-[#FD954A]'
          : pathName === `/chart/${params.slug}` && 'text-neutral-400'
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
