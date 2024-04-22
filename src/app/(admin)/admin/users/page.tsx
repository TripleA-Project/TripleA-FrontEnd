import { Metadata } from 'next';
import Page from './_components/Page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 유저 관리',
  description: 'Triple A 관리자 | 유저 관리',
};

export default function AdminUsersPage() {
  return (
    <div className="relative min-h-[calc(100vh-115px)] px-2 pt-4">
      <Page />
    </div>
  );
}
