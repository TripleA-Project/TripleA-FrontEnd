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
    updateUsers: (
      state: AdminUserListState,
      actions: PayloadAction<Partial<Omit<SiteUser, 'email'> & { email: SiteUser['email'] }>[]>,
    ) => {
      const targetUsers = actions.payload;

      const users = [...state.users];
      const defaultUsers = [...state.defaultUsers];

      for (const { email, ...targetUser } of targetUsers) {
        const userIdx = users.findIndex((user) => user.email === email);
        const defaultUserIdx = defaultUsers.findIndex((user) => user.email === email);

        if (userIdx > -1) {
          users[userIdx] = {
            ...users[userIdx],
            ...targetUser,
          };
        }

        if (defaultUserIdx > -1) {
          defaultUsers[defaultUserIdx] = {
            ...defaultUsers[defaultUserIdx],
            ...targetUser,
          };
        }
      }

      state.users = [...users];
      state.defaultUsers = [...defaultUsers];
    },
    deleteUsers: (state: AdminUserListState, actions: PayloadAction<SiteUser['id'][]>) => {
      const targetUserIds = actions.payload;

      const users = [...state.users];
      const defaultUsers = [...state.defaultUsers];

      state.users = users.filter((user) => !targetUserIds.includes(user.id));
      state.defaultUsers = defaultUsers.filter((user) => !targetUserIds.includes(user.id));
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

export const {
  setDefaultUsers,
  setUsers,
  updateUsers,
  deleteUsers,
  resetUsers,
  selectUser,
  unSelectUser,
  clearSelectedUsers,
} = adminUserListSlice.actions;

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
