'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  sizeTheme?: 'small' | 'medium' | 'large' | 'fullWidth' | 'icon';
  fullWidth?: boolean;
  bgColorTheme: 'blue' | 'gray' | 'violet' | 'orange' | 'none' | 'lightgray';
  textColorTheme: 'white' | 'black' | 'gray' | 'orange' | 'none';
  bg?: string;
}

export default function Button({
  className,
  fullWidth = false,
  sizeTheme = 'medium',
  bgColorTheme,
  textColorTheme,
  children,
  ...props
}: ButtonProps) {
  const sizeClassNames = {
    small: `h-12 w-28`,
    medium: `h-[54px] w-[358px]`,
    large: `h-14 w-40`,
    fullWidth: 'h-[54px] w-full',
    icon: `h-10 w-10`,
  };

  const backgroundColorClassNames = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    gray: 'bg-gray-600',
    violet: 'bg-[#5645F6] hover:bg-[#3E2AF0]',
    orange: 'bg-[#FD954A] hover:bg-[#E97624]',
    lightgray: 'bg-[#DBDEE1]',
    none: 'none',
  };

  const textColorClassNames = {
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-500',
    orange: 'text-[#FD954A]',
    none: 'none',
  };

  const classNames = twMerge([
    `flex cursor-pointer items-center justify-center rounded-xl font-bold`,
    sizeClassNames[sizeTheme],
    textColorClassNames[textColorTheme],
    backgroundColorClassNames[bgColorTheme],
    fullWidth && 'w-full',
    className,
  ]);

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
