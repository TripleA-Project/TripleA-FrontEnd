import { ActionCreatorWithPayload, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { SearchSiteUserRequest } from '@/interfaces/Dto/Admin/SearchSiteUserDto';
import { AdminUserTypeKey, UserTypeKey } from './adminUserListSlice';
import { FreeTrialUser } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';

type FreeTierUserSearchKey = Extract<
  keyof FreeTrialUser,
  'email' | 'fullName' | 'freeTierStartDate' | 'freeTierEndDate' | 'memo'
>;
type FreeTierUserSearch = {
  type: FreeTierUserSearchKey;
  content: FreeTrialUser[FreeTierUserSearchKey];
};
type AdminUserSearchType<T extends UserTypeKey> = T extends AdminUserTypeKey.Users
  ? SearchSiteUserRequest['type']
  : T extends AdminUserTypeKey.FreeTierUsers
  ? FreeTierUserSearch['type']
  : SearchSiteUserRequest['type'];

type AdminUserSearchPayload<T extends UserTypeKey> = { type: AdminUserSearchType<T>; value: string };

export type AdminUserSearch<T extends UserTypeKey = AdminUserTypeKey.Users> = AdminUserSearchPayload<T> & {
  recent: AdminUserSearchPayload<T> | null;
};

interface AdminUserSearchState<T extends UserTypeKey = AdminUserTypeKey.Users> {
  search: AdminUserSearch<T>;
  status: 'idle' | 'error' | 'loading' | 'success';
}

// for generic action
type UserSearchActionType = {
  setSearch: ActionCreatorWithPayload<AdminUserSearch<AdminUserTypeKey.Users>, 'adminUserFilter/setSearch'>;
  setSearchStatus: ActionCreatorWithPayload<
    'idle' | 'error' | 'loading' | 'success',
    'adminUserFilter/setSearchStatus'
  >;
};

type FreeTierUserSearchActionType = {
  setSearch: ActionCreatorWithPayload<AdminUserSearch<AdminUserTypeKey.FreeTierUsers>, 'adminUserFilter/setSearch'>;
  setSearchStatus: ActionCreatorWithPayload<
    'idle' | 'error' | 'loading' | 'success',
    'adminUserFilter/setSearchStatus'
  >;
};
//

const initialState: AdminUserSearchState<UserTypeKey> = {
  search: {
    type: 'email',
    value: '',
    recent: null,
  },
  status: 'idle',
};

export const adminUserFilterSlice = createSlice({
  name: 'adminUserFilter',
  initialState,
  reducers: {
    setSearch: <T extends AdminUserTypeKey>(
      state: AdminUserSearchState<T>,
      action: PayloadAction<AdminUserSearch<T>>,
    ) => {
      const { type, value, recent } = action.payload;

      state.search = {
        ...state.search,
        type,
        value,
        recent,
      };
    },
    setSearchStatus: <T extends AdminUserTypeKey>(
      state: AdminUserSearchState<T>,
      action: PayloadAction<AdminUserSearchState<T>['status']>,
    ) => {
      state.status = action.payload;
    },
  },
});

type AdminUserSearchActionType<T extends AdminUserTypeKey> = T extends AdminUserTypeKey.Users
  ? UserSearchActionType
  : T extends AdminUserTypeKey.FreeTierUsers
  ? FreeTierUserSearchActionType
  : UserSearchActionType;

export function useAdminUserSearch<T extends AdminUserTypeKey = AdminUserTypeKey.Users>() {
  const search = useSelector((state: RootState) => state.adminUserSearch.search as AdminUserSearch<T>);
  const dispatch = useDispatch();

  const { setSearch } = adminUserFilterSlice.actions as {
    setSearch: AdminUserSearchActionType<T>['setSearch'];
  };

  return {
    search,
    setSearch,
    dispatch,
  };
}

export function useAdminUserSearchStatus<T extends AdminUserTypeKey = AdminUserTypeKey.Users>() {
  const searchStatus = useSelector((state: RootState) => state.adminUserSearch.status);
  const dispatch = useDispatch();

  const { setSearchStatus } = adminUserFilterSlice.actions as {
    setSearchStatus: AdminUserSearchActionType<T>['setSearchStatus'];
  };

  return {
    searchStatus,
    setSearchStatus,
    dispatch,
  };
}

export default adminUserFilterSlice.reducer;
