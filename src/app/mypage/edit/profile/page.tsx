import { Metadata } from 'next';
import EditProfile from '@/components/Profile/EditProfile';
import MypageUserFetcher from '@/components/Mypage/MypageUserFetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 내 정보 수정',
  description: 'Triple A 내 정보 수정',
};

function EditProfilePage() {
  return (
    <>
      {/* @ts-expect-error server component */}
      <MypageUserFetcher>
        <EditProfile />
      </MypageUserFetcher>
    </>
  );
}

export default EditProfilePage;
