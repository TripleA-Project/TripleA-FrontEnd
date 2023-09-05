import React from 'react';
import { HorizontalLine } from '../UI/DivideLine';

function MyPageMenuLoading() {
  return (
    <div>
      <HorizontalLine />
      <div className="box-border flex flex-col justify-center gap-5 px-5 py-[34px]">
        <div className="skeleton_loading flex items-center gap-3.5">
          <div className="h-8 w-60 rounded-2xl" />
        </div>
        <div className="skeleton_loading flex items-center gap-3.5">
          <div className="h-8 w-32 rounded-2xl" />
        </div>
      </div>
      <HorizontalLine />
      <div className="skeleton_loading box-border flex justify-center pt-[18px] text-[15px]">
        <div className="h-[23px] w-20 rounded-2xl" />
      </div>
    </div>
  );
}

export default MyPageMenuLoading;
