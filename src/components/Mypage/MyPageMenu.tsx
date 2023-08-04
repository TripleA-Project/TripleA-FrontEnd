import Link from 'next/link';
import { MdOutlineContentPaste, MdOutlineSettings } from 'react-icons/md';
import { HorizontalLine } from '../UI/DivideLine';

function MyPageMenu() {
  return (
    <div>
      <HorizontalLine />
      <div className="box-border flex flex-col justify-center gap-5 px-5 py-[34px]">
        <Link href="/mypage/terms" className="flex items-center gap-3.5 text-[#5B6267]">
          <MdOutlineContentPaste className="shrink-0 text-2xl" />
          <span className="font-semibold">약관 및 개인정보 처리 동의서</span>
        </Link>
        <Link href="/logout" className="flex items-center gap-3.5 text-[#5B6267]">
          <MdOutlineSettings className="shrink-0 text-2xl" />
          <span className="font-semibold">로그아웃</span>
        </Link>
      </div>
      <HorizontalLine />
      <div className="box-border flex justify-center pt-[18px] text-[15px] font-semibold text-[#5B6267]">
        버전: 1.0.0-beta
      </div>
    </div>
  );
}

export default MyPageMenu;
