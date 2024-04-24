'use client';

import { SiteUser } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { selectUser, unSelectUser, useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';
import { Checkbox } from '@mui/material';

interface UserCheckBoxProps {
  user: SiteUser;
}

function UserCheckBox({ user }: UserCheckBoxProps) {
  const { selectedUsers, dispatch } = useAdminSelectedUserList();

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
