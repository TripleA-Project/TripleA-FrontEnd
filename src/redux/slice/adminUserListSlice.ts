import { SiteUserPayload } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { uniqBy } from 'lodash';
import { FreeTrialUser } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';

export type UserTypeKey = 'users' | 'freeTierUsers';
export type UserType<T extends UserTypeKey> = T extends 'users'
  ? SiteUserPayload
  : T extends 'freeTierUsers'
  ? FreeTrialUser
  : SiteUserPayload;

export const enum AdminUserTypeKey {
  'Users' = 'users',
  'FreeTierUsers' = 'freeTierUsers',
}

interface AdminUserListState<T extends UserTypeKey = AdminUserTypeKey.Users> {
  users: UserType<T>[];
  defaultUsers: UserType<T>[];
  selectedUsers: UserType<T>[];
}

// for generic action
type UserActionType = {
  setDefaultUsers: ActionCreatorWithPayload<SiteUserPayload[], 'adminUserListSlice/setDefaultUsers'>;
  setUsers: ActionCreatorWithPayload<SiteUserPayload[], 'adminUserListSlice/setUsers'>;
  updateUsers: ActionCreatorWithPayload<
    Partial<
      Omit<SiteUserPayload, 'email'> & {
        email: string;
      }
    >[],
    'adminUserListSlice/updateUsers'
  >;
  deleteUsers: ActionCreatorWithPayload<number[], 'adminUserListSlice/deleteUsers'>;
  resetUsers: ActionCreatorWithoutPayload<'adminUserListSlice/resetUsers'>;
  selectUser: ActionCreatorWithPayload<SiteUserPayload, 'adminUserListSlice/selectUser'>;
  unSelectUser: ActionCreatorWithPayload<SiteUserPayload, 'adminUserListSlice/unSelectUser'>;
  clearSelectedUsers: ActionCreatorWithoutPayload<'adminUserListSlice/clearSelectedUsers'>;
};

type FreeTierUserActionType = {
  setDefaultUsers: ActionCreatorWithPayload<FreeTrialUser[], 'adminUserListSlice/setDefaultUsers'>;
  setUsers: ActionCreatorWithPayload<FreeTrialUser[], 'adminUserListSlice/setUsers'>;
  updateUsers: ActionCreatorWithPayload<
    Partial<
      Omit<FreeTrialUser, 'email'> & {
        email: string;
      }
    >[],
    'adminUserListSlice/updateUsers'
  >;
  deleteUsers: ActionCreatorWithPayload<number[], 'adminUserListSlice/deleteUsers'>;
  resetUsers: ActionCreatorWithoutPayload<'adminUserListSlice/resetUsers'>;
  selectUser: ActionCreatorWithPayload<FreeTrialUser, 'adminUserListSlice/selectUser'>;
  unSelectUser: ActionCreatorWithPayload<FreeTrialUser, 'adminUserListSlice/unSelectUser'>;
  clearSelectedUsers: ActionCreatorWithoutPayload<'adminUserListSlice/clearSelectedUsers'>;
};
//

const initialState: AdminUserListState<UserTypeKey> = {
  users: [],
  defaultUsers: [],
  selectedUsers: [],
};

export const adminUserListSlice = createSlice({
  name: 'adminUserListSlice',
  initialState,
  reducers: {
    setDefaultUsers: <T extends UserTypeKey>(state: AdminUserListState<T>, actions: PayloadAction<UserType<T>[]>) => {
      const users = actions.payload;

      state.defaultUsers = [...users];
      state.users = [...users];
    },
    setUsers: <T extends UserTypeKey>(state: AdminUserListState<T>, actions: PayloadAction<UserType<T>[]>) => {
      const users = actions.payload;

      state.users = [...users];
    },
    updateUsers: <T extends UserTypeKey>(
      state: AdminUserListState<T>,
      actions: PayloadAction<Partial<Omit<UserType<T>, 'email'> & { email: UserType<T>['email'] }>[]>,
    ) => {
      const targetUsers = actions.payload;

      const users = [...state.users];
      const defaultUsers = [...state.defaultUsers];

      for (const { id, email, ...targetUser } of targetUsers) {
        const userIdx = users.findIndex((user) => (email ? user.email === email : id === user.id));
        const defaultUserIdx = defaultUsers.findIndex((user) => (email ? user.email === email : id === user.id));

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
    deleteUsers: <T extends UserTypeKey>(state: AdminUserListState<T>, actions: PayloadAction<UserType<T>['id'][]>) => {
      const targetUserIds = actions.payload;

      const users = [...state.users];
      const defaultUsers = [...state.defaultUsers];

      state.users = users.filter((user) => !targetUserIds.includes(user.id));
      state.defaultUsers = defaultUsers.filter((user) => !targetUserIds.includes(user.id));
    },
    resetUsers: <T extends UserTypeKey>(state: AdminUserListState<T>) => {
      state.users = [...state.defaultUsers];
    },
    selectUser: <T extends UserTypeKey>(state: AdminUserListState<T>, actions: PayloadAction<UserType<T>>) => {
      state.selectedUsers = uniqBy([...state.selectedUsers, actions.payload], 'email') as UserType<T>[];
    },
    unSelectUser: <T extends UserTypeKey>(state: AdminUserListState<T>, actions: PayloadAction<UserType<T>>) => {
      state.selectedUsers = state.selectedUsers.filter((user) => user.email !== actions.payload.email);
    },
    clearSelectedUsers: <T extends UserTypeKey>(state: AdminUserListState<T>) => {
      state.selectedUsers = [];
    },
  },
});

type AdminUserListSliceActionType<T extends UserTypeKey> = T extends AdminUserTypeKey.Users
  ? UserActionType
  : T extends AdminUserTypeKey.FreeTierUsers
  ? FreeTierUserActionType
  : UserActionType;

export function useAdminUserList<T extends UserTypeKey = AdminUserTypeKey.Users>() {
  const users = useSelector((state: RootState) => state.adminUserList.users as UserType<T>[]);
  const defaultUsers = useSelector((state: RootState) => state.adminUserList.defaultUsers as UserType<T>[]);

  const dispatch = useDispatch();

  const { setDefaultUsers, setUsers, updateUsers, deleteUsers, resetUsers } = adminUserListSlice.actions as {
    setDefaultUsers: AdminUserListSliceActionType<T>['setDefaultUsers'];
    setUsers: AdminUserListSliceActionType<T>['setUsers'];
    updateUsers: AdminUserListSliceActionType<T>['updateUsers'];
    deleteUsers: AdminUserListSliceActionType<T>['deleteUsers'];
    resetUsers: AdminUserListSliceActionType<T>['resetUsers'];
  };

  return {
    users,
    defaultUsers,
    dispatch,
    setDefaultUsers,
    setUsers,
    updateUsers,
    deleteUsers,
    resetUsers,
  };
}

export function useAdminSelectedUserList<T extends UserTypeKey = AdminUserTypeKey.Users>() {
  const selectedUsers = useSelector((state: RootState) => state.adminUserList.selectedUsers as UserType<T>[]);
  const dispatch = useDispatch();

  const { selectUser, unSelectUser, clearSelectedUsers } = adminUserListSlice.actions as {
    selectUser: AdminUserListSliceActionType<T>['selectUser'];
    unSelectUser: AdminUserListSliceActionType<T>['unSelectUser'];
    clearSelectedUsers: AdminUserListSliceActionType<T>['clearSelectedUsers'];
  };

  return {
    selectedUsers,
    dispatch,
    selectUser,
    unSelectUser,
    clearSelectedUsers,
  };
}

export default adminUserListSlice.reducer;
