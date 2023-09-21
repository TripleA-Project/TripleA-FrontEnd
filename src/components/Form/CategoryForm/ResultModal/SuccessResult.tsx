'use client';

import React from 'react';
import Link from 'next/link';
import { AppIcons } from '@/components/Icons';
import { MdTaskAlt } from 'react-icons/md';
import Button from '@/components/Button/Button';

interface SuccessResultProps {
  onClose: () => void;
}

function SuccessCategoryResult({ onClose }: SuccessResultProps) {
  return (
    <div>
      {/* header */}
      <div className="absolute right-4 top-4">
        <button
          onClick={() => {
            onClose();
          }}
        >
          <AppIcons.CloseFill.Orange />
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center gap-7">
        <MdTaskAlt className="text-[48px] text-[#4ddb40]" />
        <div className="text-center text-[28px]">
          <p>카테고리 수정이</p>
          <p>완료 되었습니다</p>
        </div>
      </div>
      <Link href="/" className="mt-10 block">
        <Button bgColorTheme="orange" textColorTheme="white" className={`mx-auto h-fit w-fit px-8 py-2`}>
          홈으로
        </Button>
      </Link>
    </div>
  );
}

export default SuccessCategoryResult;
