'use client';

import Link from 'next/link';
import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';

function NoMySymbol() {
  return (
    <div className="-mx-4 -mb-3 -mt-5 box-border flex h-[calc(100vh-155px)] items-center justify-center bg-[#F5F7F9]">
      <div>
        <div className="flex flex-col items-center">
          <AppIcons.Heart.Outline className='mb-[7px]' />
          <p className="text-[#9AA2A9]">관심 종목이 설정되지</p>
          <p className="text-[#9AA2A9]">않았습니다.</p>
        </div>
        <div className="mt-4 flex justify-center">
          <Link href={'/mypage/edit/symbol'}>
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
    </div>
  );
}

export default NoMySymbol;
