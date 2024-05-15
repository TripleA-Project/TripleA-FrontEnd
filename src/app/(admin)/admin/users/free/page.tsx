import { Metadata } from 'next';
import { getFreeTrialUsers } from '@/service/admin';
import AdminFreeTrialManagePage from './_components/Page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 무료체험 관리',
  description: 'Triple A 관리자 | 무료체험 관리',
};

// [TODO] API 데이터 전달
export default async function AdminFreeTrialManage() {
  const res = await getFreeTrialUsers();

  return (
    <div className="relative min-h-[calc(100vh-115px)] px-2 pt-4">
      <AdminFreeTrialManagePage />
    </div>
  );
}
