import { Metadata } from 'next';
import { Suspense } from 'react';
import MypageHome from '@/components/Mypage/MypageHome';
import MypageUserFetcher from '@/components/Mypage/MypageUserFetcher';
import MyPageHomeLoading from '@/components/Mypage/MyPageHomeLoading';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 마이 페이지',
  description: 'Triple A 마이페이지',
};

function MyPage() {
  return (
    <Suspense fallback={<MyPageHomeLoading />}>
      {/* @ts-expect-error server component */}
      <MypageUserFetcher>
        <MypageHome />
      </MypageUserFetcher>
    </Suspense>
  );
}

export default MyPage;
