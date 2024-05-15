import { FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import FreeTrialUserTable from './userTable/FreeTrialUserTable';

interface AdminFreeTrialManagePageProps {
  freeTierUsers: FreeTrialUsersPayload;
}

function AdminFreeTrialManagePage({ freeTierUsers }: AdminFreeTrialManagePageProps) {
  return (
    <div>
      <section className="h-[64px]">
        <h2 className="text-xl font-bold">무료체험 관리</h2>
      </section>
      <section>
        <FreeTrialUserTable freeTierUsers={freeTierUsers} />
      </section>
    </div>
  );
}

export default AdminFreeTrialManagePage;
