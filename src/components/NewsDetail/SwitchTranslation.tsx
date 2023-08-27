'use client';

import { toastNotify } from '@/util/toastNotify';
import { useState } from 'react';

export interface SwitchTranslationProps {
  initValue?: boolean;
  disabled?: boolean;
  onSwitch?: (isOn: boolean) => void;
}

function SwitchTranslation({ initValue = true, disabled = false, onSwitch }: SwitchTranslationProps) {
  const [isTranslation, setIsTranslation] = useState(initValue);

  return (
    <div
      className={`relative box-border flex h-5 w-[44px] cursor-pointer select-none items-center justify-between rounded-[30px] p-0.5 transition-[background-color] duration-500 ${
        isTranslation ? 'bg-[#FD954A]' : 'bg-[#ECECEC]'
      }`}
      onClick={() => {
        if (!onSwitch) return;
        if (disabled) {
          toastNotify('error', '현재 기사번역을 제공할 수 없습니다');

          return;
        }

        const prevTranslation = isTranslation;

        setIsTranslation((prev) => !prev);

        onSwitch(!prevTranslation);
      }}
    >
      <p className="ml-[4px] text-[10px] font-semibold leading-3 text-white">{isTranslation ? 'ON' : ''}</p>
      <p className="mr-[1px] text-[10px] font-semibold leading-3 text-white">{!isTranslation ? 'OFF' : ''}</p>
      <div
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white drop-shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] transition-[left] ${
          isTranslation ? 'left-full -translate-x-[calc(100%+2px)]' : 'left-0.5'
        }`}
      />
    </div>
  );
}

export default SwitchTranslation;
