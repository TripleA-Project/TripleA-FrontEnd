'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  const pathName = usePathname();
  return (
    <div
      className={`${
        pathName === '/chart' ? 'absolute left-9 top-[0.8]' : 'absolute left-[50%] -translate-x-1/2 transform'
      } text-center text-lg font-extrabold text-[#131F3C]`}
    >
      {title}
    </div>
  );
}

export default Title;
