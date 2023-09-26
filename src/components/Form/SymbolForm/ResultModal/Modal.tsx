'use client';

import React from 'react';
import FailResult from './FailResult';
import SuccessResult from './SuccessResult';
import type { SymbolResultList } from '@/hooks/useSymbolAsyncMutation';

export interface SymbolEditResultModalProps {
  open: boolean;
  result: 'success' | 'fail';
  symbolResults: {
    success: SymbolResultList;
    fail: SymbolResultList;
  };
  onClose: () => void;
}

function SymbolEditResultModal({ open, result, symbolResults, onClose }: SymbolEditResultModalProps) {
  return open ? (
    <div className="fixed_inner fixed top-0 z-[12] h-full bg-black/10 backdrop-blur-sm">
      {/* wrapper */}
      <div className="flex h-full w-full items-center justify-center">
        {/* content */}
        <div className="relative box-border w-full rounded-xl bg-white p-3 shadow-lg">
          {result === 'success' ? (
            <SuccessResult onClose={onClose} />
          ) : (
            <FailResult symbolResults={symbolResults} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default SymbolEditResultModal;
