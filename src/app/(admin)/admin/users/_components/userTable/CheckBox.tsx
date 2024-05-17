'use client';

import { SiteUserPayload } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';
import { Checkbox } from '@mui/material';

interface UserCheckBoxProps {
  user: SiteUserPayload;
}

function UserCheckBox({ user }: UserCheckBoxProps) {
  const { selectedUsers, selectUser, unSelectUser, dispatch } = useAdminSelectedUserList();

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
