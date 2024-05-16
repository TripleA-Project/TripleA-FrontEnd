import { FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import FreeTrialUserTableContainer from './userTable/FreeTrialUserTableContainer';
import SearchFormContext from './form-context/SearchFormContext';
import dynamic from 'next/dynamic';
import AdminFreeTrialTitle from './AdminFreeTrialTitle';

interface AdminFreeTrialManagePageProps {
  freeTierUsers: FreeTrialUsersPayload;
}

const UserSearch = dynamic(() => import('./search/UserSearch'), {
  ssr: false,
  loading(loadingProps) {
    return (
      <div className="skeleton_loading my-4 w-full">
        <div className="h-14 w-full rounded-lg border" />
      </div>
    );
  },
});

function AdminFreeTrialManagePage({ freeTierUsers }: AdminFreeTrialManagePageProps) {
  return (
    <div>
      {/* <section className="h-[64px]">
        <h2 className="text-xl font-bold">무료체험 관리</h2>
      </section> */}
      <AdminFreeTrialTitle />
      <div className="sticky top-[52px] z-[4] bg-white">
        <SearchFormContext>
          <UserSearch freeTierUsers={freeTierUsers} />
        </SearchFormContext>
      </div>
      <section>
        <FreeTrialUserTableContainer freeTierUsers={freeTierUsers} />
      </section>
    </div>
  );
}

export default AdminFreeTrialManagePage;
