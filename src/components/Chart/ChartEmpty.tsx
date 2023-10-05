import React from 'react';
import { AppLogos } from '../Icons';

function ChartEmpty() {
  return (
    <div className="flex h-[322px] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <AppLogos.Orange />
        <p className={`font-bold text-[#9AA1A9]`}>차트 데이터가 없습니다</p>
      </div>
    </div>
  );
}

export default ChartEmpty;
