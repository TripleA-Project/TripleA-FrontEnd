'use client';

import React, { MouseEvent, MouseEventHandler } from 'react';

export interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'type'> {
  type?: 'button' | 'submit' | 'reset' | undefined;
  sizeTheme?: 'small' | 'medium' | 'large' | 'icon';
  fullWidth?: boolean;
  bgColorTheme: 'blue' | 'gray' | 'violet' | 'orange' | 'none';
  textColorTheme: 'white' | 'black' | 'gray' | 'orange' | 'none';
  bg?: string;
  onClick: () => void;
}

export default function Button({
  className,
  fullWidth = false,
  type,
  sizeTheme = 'medium',
  bgColorTheme,
  textColorTheme,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const sizeClassNames = {
    small: `h-12 ${fullWidth ? 'w-full' : 'w-28'}`,
    medium: `h-10 ${fullWidth ? 'w-full' : 'w-72'}`,
    large: `h-14 ${fullWidth ? 'w-full' : 'w-40'}`,
    icon: `h-10 w-10`,
  };

  const backgroundColor = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    gray: 'bg-gray-600',
    violet: 'bg-[#5645F6] hover:bg-[#3E2AF0]',
    orange: 'bg-[#FD954A] hover:bg-[#E97624]',
    none: 'none',
  };
  const textColor = {
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-500',
    orange: 'text-[#FD954A]',
    none: 'none',
  };

  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-xl ${textColor[textColorTheme]} ${
        sizeClassNames[sizeTheme]
      } ${backgroundColor[bgColorTheme]} ${className ? ` ${className}` : ''}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
