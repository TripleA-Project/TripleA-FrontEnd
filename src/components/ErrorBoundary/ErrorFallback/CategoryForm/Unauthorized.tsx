'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import FitPage from '@/components/Layout/FitPage';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';

function CategoryFormUnauthorized() {
  return (
    <FitPage>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center rounded-lg border-transparent bg-white px-4 py-8 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]">
          <div className="mb-2 text-4xl">
            <NotificationIcons.VeryDissatisfied />
          </div>
          <div className="my-6 text-center">
            <p className="text-xl font-semibold text-[#4E525D]">로그인후</p>
            <p className="text-xl font-semibold text-[#4E525D]">카테고리 수정이 가능합니다</p>
          </div>
          <Link href="/login?continueURL=/mypage/edit/category">
            <Button type="button" bgColorTheme="orange" textColorTheme="white" className="!h-fit !w-fit !px-4 !py-2">
              로그인
            </Button>
          </Link>
        </div>
      </div>
    </FitPage>
  );
}

export default CategoryFormUnauthorized;
