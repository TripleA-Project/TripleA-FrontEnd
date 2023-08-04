import Link from 'next/link';
import { MdOutlineDelete, MdPersonOutline } from 'react-icons/md';
import { HorizontalLine } from '../UI/DivideLine';

function EditProfileMenu() {
  return (
    <div>
      <HorizontalLine />
      <div className="box-border flex flex-col justify-center gap-5 px-5 py-[34px]">
        <Link className="flex w-max items-center gap-3.5 text-[#5B6267]" href="/mypage/edit/password">
          <MdPersonOutline className="shrink-0 text-2xl" />
          <span className="font-semibold">비밀번호 변경하기</span>
        </Link>
        <Link className="flex w-max items-center gap-3.5 text-[#5B6267]" href="/mypage/membership/with-drawal">
          <MdOutlineDelete className="shrink-0 text-2xl" />
          <span className="font-semibold">회원탈퇴</span>
        </Link>
      </div>
      <HorizontalLine />
    </div>
  );
}

export default EditProfileMenu;
