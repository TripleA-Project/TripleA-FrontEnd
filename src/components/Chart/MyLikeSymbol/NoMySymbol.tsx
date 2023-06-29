'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Heart from '../../../../public/Heart.svg';

function NoMySymbol() {
  return (
    <div className="mt-[175px]">
      <div className="flex flex-col items-center">
        <Image src={Heart} alt="heart icon" className="mb-[7px]" />
        <p className="text-[#9AA2A9]">관심 종목이 설정되지</p>
        <p className="text-[#9AA2A9]">않았습니다.</p>
      </div>
      <div className="mt-4 flex justify-center">
        <Link href={'/'}>
          <Button
            className="box-border !h-[54px] !w-[202px] !px-4 !py-[15px]"
            bgColorTheme="orange"
            textColorTheme="white"
            onClick={() => {}}
          >
            관심 추가하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NoMySymbol;
