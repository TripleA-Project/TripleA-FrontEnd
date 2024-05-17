import { Metadata } from 'next';
import { getFreeTrialUsers } from '@/service/admin';
import AdminFreeTrialManagePage from './_components/Page';
import FreeTrialManageModal from './_components/modal/FreeTrialManageModal';
import SelectedFreeTierUsersModal from './_components/modal/SelectedFreeTierUsersModal';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 무료체험 관리',
  description: 'Triple A 관리자 | 무료체험 관리',
};

export default async function AdminFreeTrialManage() {
  const res = await getFreeTrialUsers();

  const freeTierUsers = res.data.data?.length ? res.data.data : [];

  return (
    <div className="relative min-h-[calc(100vh-115px)] overflow-auto px-2 pt-4">
      <AdminFreeTrialManagePage freeTierUsers={freeTierUsers} />
      <FreeTrialManageModal />
      <SelectedFreeTierUsersModal />
    </div>
  );
}
