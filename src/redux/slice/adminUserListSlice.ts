import { SiteUser } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { uniqBy } from 'lodash';

interface AdminUserListState {
  users: SiteUser[];
  defaultUsers: SiteUser[];
  selectedUsers: SiteUser[];
}

const initialState: AdminUserListState = {
  users: [],
  defaultUsers: [],
  selectedUsers: [],
};

export const adminUserListSlice = createSlice({
  name: 'adminUserListSlice',
  initialState,
  reducers: {
    setDefaultUsers: (state: AdminUserListState, actions: PayloadAction<AdminUserListState['users']>) => {
      const users = actions.payload;

      state.defaultUsers = [...users];
      state.users = [...users];
    },
    setUsers: (state: AdminUserListState, actions: PayloadAction<AdminUserListState['users']>) => {
      const users = actions.payload;

      state.users = [...users];
    },
    resetUsers: (state: AdminUserListState) => {
      state.users = [...state.defaultUsers];
    },
    selectUser: (state: AdminUserListState, actions: PayloadAction<SiteUser>) => {
      state.selectedUsers = uniqBy([...state.selectedUsers, actions.payload], 'email');
    },
    unSelectUser: (state: AdminUserListState, actions: PayloadAction<SiteUser>) => {
      state.selectedUsers = state.selectedUsers.filter((user) => user.email !== actions.payload.email);
    },
    clearSelectedUsers: (state: AdminUserListState) => {
      state.selectedUsers = [];
    },
  },
});

export const { setDefaultUsers, setUsers, resetUsers, selectUser, unSelectUser, clearSelectedUsers } =
  adminUserListSlice.actions;

export function useAdminUserList() {
  const users = useSelector((state: RootState) => state.adminUserList.users);
  const dispatch = useDispatch();

  return {
    users,
    dispatch,
  };
}

export function useAdminSelectedUserList() {
  const selectedUsers = useSelector((state: RootState) => state.adminUserList.selectedUsers);
  const dispatch = useDispatch();

  return {
    selectedUsers,
    dispatch,
  };
}

export default adminUserListSlice.reducer;
