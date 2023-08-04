import { Metadata } from 'next';
import MypageHome from '@/components/Mypage/MypageHome';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 마이 페이지',
  description: 'Triple A 마이페이지',
};

function MyPage() {
  return <MypageHome />;
}

export default MyPage;
