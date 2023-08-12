import React from 'react';
import Header from './Modal/Header';

function Loading() {
  return (
    <>
      <div className="mb-4">
        <Header />
      </div>
      <div className="space-y-2">
        <div className="flex">
          <h3 className="w-20 font-bold">평가</h3>
          <div className="skeleton_loading flex-1 self-center">
            <div className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <div className="flex">
          <h3 className="w-20 font-bold">의견</h3>
          <div className="skeleton_loading flex-1 self-center">
            <div className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <div className="flex">
          <h3 className="w-20 font-bold">분석</h3>
          <div className="skeleton_loading flex flex-1 flex-col gap-1 self-center">
            <div className="h-6 w-full rounded-full" />
            <div className="h-6 w-full rounded-full" />
            <div className="h-6 w-full rounded-full" />
          </div>
        </div>
        <div className="flex">
          <h3 className="w-20 font-bold">AI</h3>
          <div className="skeleton_loading flex-1 self-center">
            <div className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="text-sm font-bold">오늘 남은 횟수: </div>
          <div className="skeleton_loading ml-2">
            <div className="h-5 w-8 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
