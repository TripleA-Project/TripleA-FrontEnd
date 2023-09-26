'use client';

import React from 'react';

interface DialogDimProps {
  onClose: () => void;
}

function DialogDim({ onClose }: DialogDimProps) {
  return <div className="absolute left-0 top-0 z-[13] h-full w-full bg-black/60" onClick={onClose} />;
}

export default DialogDim;
