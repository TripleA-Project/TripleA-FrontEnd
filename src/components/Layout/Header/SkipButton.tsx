'use client';

import React from 'react';
import { type IconBaseProps } from 'react-icons';
import { BiArrowBack } from 'react-icons/bi';

interface SkipButtonProps extends Omit<IconBaseProps, 'onClick'> {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function SkipButton({ text, onClick, ...props }: SkipButtonProps) {
  return (
    <div className="flex cursor-pointer items-center gap-1" onClick={onClick}>
      {text ? <span>{text}</span> : null}
      <BiArrowBack className="shrink-0 rotate-180 text-[24px] text-[#FD954A]" {...props} />
    </div>
  );
}

export default SkipButton;
