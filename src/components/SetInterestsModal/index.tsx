'use client';

import React from 'react';
import { MdClear } from 'react-icons/md';
import CategoryAccordion from '../Accordion/CategoryAccordion';
import SymbolAccordion from '../Accordion/SymbolAccordion';

interface SetInterestModalProps {
  onClose?: () => void;
}

function SetInterestModal({ onClose }: SetInterestModalProps) {
  return (
    <div className="fixed_inner fixed top-0 z-10 h-screen overflow-auto bg-white">
      <div className="box-border px-4">
        <div className="mb-5 flex justify-end">
          <MdClear className="cursor-pointer text-2xl" onClick={() => onClose && onClose()} />
        </div>
        <div className="mt-4 space-y-[54px]">
          <CategoryAccordion />
          <SymbolAccordion />
        </div>
      </div>
    </div>
  );
}

export default SetInterestModal;
