'use client';

import React from 'react';
import FailResult from './FailResult';
import SuccessResult from './SuccessResult';
import type { CategoryResultList } from '@/hooks/useCategoryAsyncMutation';

export interface CategoryEditResultModalProps {
  open: boolean;
  result: 'success' | 'fail';
  categoryResults: {
    success: CategoryResultList;
    fail: CategoryResultList;
  };
  onClose: () => void;
}

function CategoryEditResultModal({ open, result, categoryResults, onClose }: CategoryEditResultModalProps) {
  return open ? (
    <div className="fixed_inner fixed top-0 z-[12] h-full bg-black/10 backdrop-blur-sm">
      {/* wrapper */}
      <div className="flex h-full w-full items-center justify-center">
        {/* content */}
        <div className="relative box-border w-full rounded-xl bg-white p-3 shadow-lg">
          {result === 'success' ? (
            <SuccessResult onClose={onClose} />
          ) : (
            <FailResult categoryResults={categoryResults} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default CategoryEditResultModal;
