'use client';

import React from 'react';
import Header from '..';
import { NoBarBackArrowButton } from '../BackButtonHeader/BackButton';
import { useRouter } from 'next/navigation';

function FindPasswordHeader() {
  const { back } = useRouter();
  const handleBack = () => {
    back();
  };

  return (
    <Header fixed headerClassName="border-b border-b-[#C6C6C6]">
      <div className="flex w-full">
        <NoBarBackArrowButton onClick={handleBack} />
        <h2 className={`flex-1 -translate-x-2 text-center font-semibold text-black`}>비밀번호 찾기</h2>
      </div>
    </Header>
  );
}

export default FindPasswordHeader;
