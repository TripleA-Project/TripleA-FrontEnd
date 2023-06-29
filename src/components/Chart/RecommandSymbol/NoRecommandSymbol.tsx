'use client';

import Image from 'next/image';
import React from 'react';
import Heart from '../../../../public/Heart.svg';

function NoRecommandSymbol() {
  return (
    <div className="mt-[175px]">
      <div className="flex flex-col items-center">
        <Image src={Heart} alt="heart icon" className="mb-[7px]" />
        <p className="text-[#9AA2A9]">추천 심볼을 제공할 수</p>
        <p className="text-[#9AA2A9]">없습니다.</p>
      </div>
    </div>
  );
}

export default NoRecommandSymbol;
