'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MdOutlineContentPaste, MdOutlineSettings } from 'react-icons/md';
import { HorizontalLine } from '../UI/DivideLine';
import AllTermsModal from './AllTermsModal';
import { ROUTE_PATH } from '@/constants/routePath';
import { AppLogos } from '../Icons';

function MyPageMenu() {
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <div>
      <HorizontalLine />
      <div className="box-border flex flex-col justify-center gap-5 px-5 py-[34px]">
        <Link href={ROUTE_PATH.NOTICE.LIST} className="flex items-center gap-3.5 font-semibold text-[#5B6267]">
          <AppLogos.Gray /> 공지사항
        </Link>
        <div
          onClick={() => setTermsModalOpen(true)}
          className="flex cursor-pointer items-center gap-3.5 text-[#5B6267]"
        >
          <MdOutlineContentPaste className="shrink-0 text-2xl" />
          <span className="font-semibold">약관 및 개인정보 처리 동의서</span>
        </div>
        <Link href="/logout" className="flex items-center gap-3.5 text-[#5B6267]">
          <MdOutlineSettings className="shrink-0 text-2xl" />
          <span className="font-semibold">로그아웃</span>
        </Link>
      </div>
      <HorizontalLine />
      <div className="box-border flex justify-center pt-[18px] text-[15px] font-semibold text-[#5B6267]">
        버전: 1.0.0
      </div>
      <AllTermsModal open={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
    </div>
  );
}

export default MyPageMenu;
