import Link from 'next/link';
import { MdOutlineDelete, MdPersonOutline } from 'react-icons/md';
import { HorizontalLine } from '../UI/DivideLine';
import { AppIcons } from '../Icons';

interface EditProfileMenuProps {
  isEditing?: boolean;
}

function EditProfileMenu({ isEditing }: EditProfileMenuProps) {
  return (
    <div className={`relative ${isEditing ? 'pointer-events-none' : ''}`}>
      {isEditing ? (
        <div
          className={`absolute left-0 top-0 -mx-8 flex h-full w-screen min-w-[390px] max-w-[768px] items-center justify-center bg-black/10`}
        />
      ) : null}
      <HorizontalLine style={{ margin: '0 -32px' }} />
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
      <HorizontalLine style={{ margin: '0 -32px' }} />
    </div>
  );
}

export default EditProfileMenu;
