'use client';

import React from 'react';
import { AppIcons } from '@/components/Icons';
import { type AINewsAnalysisModalProps } from './AINewsAnalysisModal';

interface HeaderProps extends Pick<AINewsAnalysisModalProps, 'onClose'> {}

function Header({ onClose }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3>주가 영향 AI 분석</h3>
      <button className="flex items-center justify-center" onClick={() => onClose && onClose()}>
        <AppIcons.CloseFill.Orange className="shrink-0" />
      </button>
    </div>
  );
}

export default Header;
