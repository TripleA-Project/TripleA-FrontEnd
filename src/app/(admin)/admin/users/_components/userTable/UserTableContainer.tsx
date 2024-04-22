'use client';

import UserTable from './UserTable';
import { AdminUserSearch } from '@/redux/slice/adminUserSearchSlice';
import { useQuery } from '@tanstack/react-query';
import { getSiteUsers } from '@/service/admin';
import AdminUsersError from '../AdminUsersError';
import { useLayoutEffect } from 'react';
import { setDefaultUsers, useAdminUserList } from '@/redux/slice/adminUserListSlice';

export interface SearchFormData {
  searchType: AdminUserSearch['type'];
  searchValue: AdminUserSearch['value'];
}

function UserTableContainer() {
  const {
    data: userList,
    status,
    error,
  } = useQuery(['siteUser'], () => getSiteUsers(), {
    enabled: typeof window !== 'undefined',
    select(response) {
      return response.data.data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { users, dispatch } = useAdminUserList();

  useLayoutEffect(() => {
    dispatch(setDefaultUsers(userList ?? []));
  }, [userList]); /* eslint-disable-line */

  if (typeof window === 'undefined' || status === 'loading')
    return (
      <div className="max-h-[426px] min-h-[400px] max-w-full overflow-auto">
        <UserTable.Loading />
      </div>
    );

  if (error) {
    return <AdminUsersError error={error} />;
  }

  return (
    <div className="relative max-h-[426px] min-h-[400px] max-w-full overflow-auto">
      <UserTable userList={users} />
    </div>
  );
}

export default UserTableContainer;
