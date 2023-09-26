'use client';

import React from 'react';
import DialogDim from './DialogDim';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

function Dialog({ open, onClose, children, ...props }: DialogProps) {
  return open ? (
    <div className="animate__animated animate__fadeIn fixed_inner fixed top-0 z-[12] flex h-full w-full items-center justify-center">
      <DialogDim onClose={onClose} />
      <div className="relative z-[13] w-full max-w-[520px]">{children}</div>
    </div>
  ) : null;
}

export default Dialog;
