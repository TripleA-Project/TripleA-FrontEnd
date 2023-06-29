'use client';
import { useParams, usePathname } from 'next/navigation';
import path from 'path';
import React from 'react';

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  const pathName = usePathname();
  const params = useParams();
  return (
    <div
      className={`${
        pathName === '/chart'? 'absolute left-9 top-[0.8] text-center text-lg font-extrabold text-[#131F3C]':''
      } ${
        pathName === `/chart/symbol` ?
        'transform-translate-x-1/2 absolute left-[50%] text-center text-lg font-extrabold text-[#131F3C]': ''
      } ${pathName === '/login'? 'ml-[10px]': ''} ${pathName ==='/read'? 'text-center': ''}`}
    >
      {title}
    </div>
  );
}

export default Title;
