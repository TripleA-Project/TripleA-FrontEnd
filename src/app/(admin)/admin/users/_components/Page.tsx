'use client';

import dynamic from 'next/dynamic';
import UserTableContainer from './userTable/UserTableContainer';
import { UserSearchProps } from './search/UserSearch';
import { setSearchStatus, useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import Toolbar from './Toolbar';
import AdminUsersTitle from './Title';
import UserManageModal from './modal/UserManageModal';
import SelectedUsersModal from './modal/SelectedUsersModal';

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

function Page() {
  const { dispatch } = useAdminUserSearchStatus();

  const onSearch: UserSearchProps['onSearch'] = (status) => {
    dispatch(setSearchStatus(status));
  };

  return (
    <>
      <Toolbar />
      <AdminUsersTitle />
      <div className="sticky top-[52px] z-[4] bg-white">
        <div className="flex w-full items-center gap-4">
          <UserSearch onSearch={onSearch} />
        </div>
      </div>
      <UserTableContainer />
      <UserManageModal />
      <SelectedUsersModal />
    </>
  );
}

export default Page;
