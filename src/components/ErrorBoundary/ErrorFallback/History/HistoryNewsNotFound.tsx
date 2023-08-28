import React from 'react';
import { AppIcons } from '@/components/Icons';

function HistoryNewsNotFound() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4">
      <AppIcons.Message />
      <p className="text-[#9AA2A9]">검색 결과가 없습니다.</p>
    </div>
  );
}

export default HistoryNewsNotFound;
