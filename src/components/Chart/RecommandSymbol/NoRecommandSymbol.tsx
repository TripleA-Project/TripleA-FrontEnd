'use client';

import { AppIcons } from '@/components/Icons';

function NoRecommandSymbol() {
  return (
    <div className="-mx-4 -mb-3 -mt-5 box-border flex h-[calc(100vh-155px)] items-center justify-center bg-[#F5F7F9]">
      <div>
        <div className="flex flex-col items-center">
          <AppIcons.Heart.Outline className='mb-[7px]' />
          <p className="text-[#9AA2A9]">인기 종목을 제공할 수</p>
          <p className="text-[#9AA2A9]">없습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default NoRecommandSymbol;
