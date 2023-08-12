'use client';

import React, { useState } from 'react';
import { toastNotify } from '@/util/toastNotify';

export interface SwitchAIAnalysisProps {
  initValue?: boolean;
  value?: boolean;
  disabled?: boolean;
  onSwitch?: (isOn: boolean) => void;
}

function SwitchAIAnalysis({ initValue = false, value, disabled = false, onSwitch }: SwitchAIAnalysisProps) {
  const controlMode = typeof value !== 'undefined';
  const [isOn, setIsOn] = useState(initValue);

  return (
    <div
      className={`relative box-border flex h-5 w-[44px] cursor-pointer select-none items-center justify-between rounded-[30px] p-0.5 transition-[background-color] duration-500 ${
        (controlMode ? value : isOn) ? 'bg-[#FD954A]' : 'bg-[#ECECEC]'
      }`}
      onClick={() => {
        if (!onSwitch) return;
        if (disabled) {
          toastNotify('error', '현재 AI번역을 제공할 수 없습니다');

          return;
        }

        const prevValue = value;

        if (value === undefined) {
          setIsOn((prev) => !prev);
        }

        onSwitch(!prevValue);
      }}
    >
      <p className="ml-[4px] text-[10px] font-semibold leading-3 text-white">
        {(controlMode ? value : isOn) ? 'ON' : ''}
      </p>
      <p className="mr-[1px] text-[10px] font-semibold leading-3 text-white">
        {(controlMode ? !value : !isOn) ? 'OFF' : ''}
      </p>
      <div
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white drop-shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] transition-[left] ${
          (controlMode ? value : isOn) ? 'left-full -translate-x-[calc(100%+2px)]' : 'left-0.5'
        }`}
      />
    </div>
  );
}

export default SwitchAIAnalysis;
