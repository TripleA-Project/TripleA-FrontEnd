'use client';

import Header from '@/components/Layout/Header';
import { BackArrowButton, NoBarBackArrowButton } from '@/components/Layout/Header/BackButtonHeader/BackButton';
import SkipButton from '@/components/Layout/Header/SkipButton';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface StepFormHeader {
  type?: 'Arrow' | 'NoBarArrow';
  title?: string;
  headerClassName?: string;
  hide?: boolean;
  skipable?: boolean;
  children: React.ReactNode;
}

function StepFormHeader({ type, headerClassName, title, hide, skipable, children }: StepFormHeader) {
  const { back } = useRouter();

  // @ts-ignore
  const { prev, skip, step } = useFormContext();

  const handleBack = () => {
    step === 1 ? back() : prev();
  };

  return (
    <Header fixed className={`flex-col ${hide ? 'hidden' : ''} ${headerClassName ?? ''}`}>
      <div className="flex w-full justify-between">
        {type === 'Arrow' ? <BackArrowButton onClick={handleBack} /> : <NoBarBackArrowButton onClick={handleBack} />}
        {title ? (
          <h2 className={`font-semibold text-black ${!skipable ? '-translate-x-[10%]' : ''}`}>{title}</h2>
        ) : null}
        {skipable ? <SkipButton onClick={() => skip()} text={'건너뛰기'} /> : <div></div>}
      </div>
      {children}
    </Header>
  );
}

export default StepFormHeader;
