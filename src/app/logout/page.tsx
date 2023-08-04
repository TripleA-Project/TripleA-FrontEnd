import Logout from '@/components/Logout';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: '로그아웃',
  description: 'Triple A 로그아웃',
};

export default async function LogoutPage() {
  return <Logout />;
}
