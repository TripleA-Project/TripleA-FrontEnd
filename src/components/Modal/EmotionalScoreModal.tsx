import React from 'react';
import { InfoIcon } from '@/components/Button/Icons';

export default function EmotionalScoreModal() {
  return (
    <div className="absolute -bottom-[100px] right-0 z-10 m-[20px] flex min-h-[163px] min-w-[250px] flex-col gap-[20px]  rounded-lg border border-solid border-[rgba(0,0,0,0.2)] bg-white p-[20px] shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
      <div className="title">
        <h3 className="align-center flex justify-center gap-[10px] text-[30px] font-semibold">
          <InfoIcon />
          <span className="text-[24px]">AI 감성 분석</span>
        </h3>
        <p className="text-center">(최근 3시간 기준)</p>
      </div>
      <div className="scorePercentages align-center flex justify-between">
        <div className="flex gap-[5px]">
          <div className="align-center flex h-[24px] w-[24px] justify-center rounded-lg bg-[#FD9549] text-white">+</div>
          <span className="font-[550] text-[#4E525D]">47%</span>
        </div>
        <div className="flex gap-[5px]">
          <div className="align-center flex h-[24px] w-[24px] justify-center rounded-lg bg-[#91DF75] text-white">•</div>
          <span className="font-[550] text-[#4E525D]">25%</span>
        </div>
        <div className="flex gap-[5px]">
          <div className="align-center flex h-[24px] w-[24px] justify-center rounded-lg bg-[#786AE4] text-white">-</div>
          <span className="font-[550] text-[#4E525D]">28%</span>
        </div>
      </div>
      <div>
        <div className="scoreGraph h-[24px] min-w-[140px] rounded-lg bg-gradient-to-r from-[#FD9549] via-[#91DF75] to-[#786AE4]"></div>
        <div className="align-center flex justify-between">
          <div className="flex w-[30px] flex-col justify-center">
            <div className="text-center text-[#FD9549]">▴</div>
            <div className="text-center">10</div>
          </div>
          <div className="flex w-[30px] flex-col justify-center">
            <div className="text-center text-[#91DF75]">▴</div>
            <div className="text-center">1</div>
          </div>
          <div className="flex w-[30px] flex-col justify-center">
            <div className="text-center text-[#786AE4]">▴</div>
            <div className="text-center">-10</div>
          </div>
        </div>
      </div>
    </div>
  );
}
