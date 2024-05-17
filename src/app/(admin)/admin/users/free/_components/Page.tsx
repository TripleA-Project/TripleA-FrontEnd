import { FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import FreeTrialUserTableContainer from './userTable/FreeTrialUserTableContainer';
import SearchFormContext from './form-context/SearchFormContext';
import dynamic from 'next/dynamic';
import AdminFreeTrialTitle from './AdminFreeTrialTitle';
import ActionControl from './action-control/ActionControl';
import NotFoundFreeTierUsers from './NotFoundFreeTierUsers';

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
  if (!freeTierUsers?.length) {
    return (
      <div>
        <AdminFreeTrialTitle />
        <NotFoundFreeTierUsers />
      </div>
    );
  }

  return (
    <div>
      <AdminFreeTrialTitle />
      <div className="sticky top-[52px] z-[4] bg-white">
        <SearchFormContext>
          <UserSearch freeTierUsers={freeTierUsers} />
        </SearchFormContext>
      </div>
      <section>
        <FreeTrialUserTableContainer freeTierUsers={freeTierUsers} />
      </section>
      <ActionControl />
    </div>
  );
}

export default AdminFreeTrialManagePage;
