import Button from '@/components/Button/Button';
import Link from 'next/link';
import { MdTaskAlt } from 'react-icons/md';

interface CompletedEditProfilesProps {
  hideHeader?: boolean;
}

function CompleteEditProfiles(props: CompletedEditProfilesProps) {
  return (
    <div className="-mt-[115px] flex h-[calc(100vh-126px)] items-center justify-center">
      <div className="flex flex-col items-center gap-[63px]">
        <MdTaskAlt className="text-[48px]" />
        <div className="text-center text-[28px]">
          <p>내 정보 수정이</p>
          <p>완료 되었습니다.</p>
        </div>
      </div>
      <Link href="/" className="fixed_inner fixed bottom-[15px] z-[11]">
        <Button fullWidth bgColorTheme="orange" textColorTheme="white">
          메인으로 가기
        </Button>
      </Link>
    </div>
  );
}

export default CompleteEditProfiles;
