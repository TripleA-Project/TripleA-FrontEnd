'use client';

import SwitchTranslation, { SwitchTranslationProps } from './SwitchTranslation';
import { AppIcons } from '../Icons';

interface NewsDetailTranslationProps extends SwitchTranslationProps {}

export function NewsDetailTranslationLoading() {
  return (
    <div className="flex justify-end">
      <div className="flex w-max items-center gap-2">
        <div className="flex items-center gap-1">
          <AppIcons.Translation />
          <span className="text-xs font-semibold leading-none text-[#4E525D]">한글 번역</span>
        </div>
        <SwitchTranslation />
      </div>
    </div>
  );
}

function NewsDetailTranslation({ initValue = true, disabled = false, onSwitch }: NewsDetailTranslationProps) {
  return (
    <div className="flex justify-end">
      <div className="flex w-max items-center gap-2">
        <div className="flex items-center gap-1">
          <AppIcons.Translation />
          <span className="text-xs font-semibold leading-none text-[#4E525D]">한글 번역</span>
        </div>
        <SwitchTranslation initValue={initValue} disabled={disabled} onSwitch={onSwitch} />
      </div>
    </div>
  );
}

export default NewsDetailTranslation;
