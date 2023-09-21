import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GuardBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  activeGuard?: boolean;
}

function GuardBox({ activeGuard = true, className, ...props }: GuardBoxProps) {
  const classNames = twMerge(`bg-white/60`, `absolute left-0 top-0 z-[2] w-full h-full`, className);

  return activeGuard ? <div className={classNames} {...props} /> : null;
}

export default GuardBox;
