import React from 'react';
import { AppIcons } from '@/components/Icons';
import FitPage from '@/components/Layout/FitPage';

function SymbolNewsEmpty() {
  return (
    <FitPage>
      <div className="box-border h-full bg-white px-4">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <AppIcons.Message />
            <p>뉴스를 찾을 수 없습니다</p>
          </div>
        </div>
      </div>
    </FitPage>
  );
}

export default SymbolNewsEmpty;
