import { Metadata } from 'next';
import EditPasswordPage from '@/components/Mypage/EditPasswordPage';
import MypageUserFetcher from '@/components/Mypage/MypageUserFetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 비밀번호 변경',
  description: 'Triple A 비밀번호 변경',
};

async function PasswordEditPage() {
  return (
    <>
      {/* @ts-expect-error server component */}
      <MypageUserFetcher>
        <EditPasswordPage />
      </MypageUserFetcher>
    </>
  );
}

export default PasswordEditPage;
