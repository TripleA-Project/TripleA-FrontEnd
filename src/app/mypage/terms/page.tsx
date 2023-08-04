import { Metadata } from 'next';
import TermsPage from '@/components/Mypage/TermPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Triple A | 약관',
  description: 'Triple A 약관',
};

function Terms() {
  return <TermsPage />;
}

export default Terms;
