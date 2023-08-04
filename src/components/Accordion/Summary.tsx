'use client';

import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface SummaryProps {
  open: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function Summary({ open, onClick, children }: SummaryProps) {
  return (
    <div className="inline-flex cursor-pointer items-center gap-5 align-top" onClick={onClick}>
      <BiChevronDown
        className={`shrink-0 origin-center text-[34px] transition-transform ${open ? 'rotate-0' : 'rotate-180'}`}
      />
      {children}
    </div>
  );
}

export default Summary;
