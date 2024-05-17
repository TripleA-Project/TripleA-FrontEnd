'use client';

import { FreeTrialUser } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import { AdminUserTypeKey, useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';
import { Checkbox } from '@mui/material';

interface UserCheckBoxProps {
  user: FreeTrialUser;
}

function UserCheckBox({ user }: UserCheckBoxProps) {
  const { selectedUsers, selectUser, unSelectUser, dispatch } =
    useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    dispatch(checked ? selectUser(user) : unSelectUser(user));
  };

  return (
    <Checkbox
      sx={{ width: '24px', height: '24px' }}
      onChange={handleCheckBox}
      checked={!!selectedUsers.find((selectedUser) => selectedUser.email === user.email)}
    />
  );
}

export default UserCheckBox;
