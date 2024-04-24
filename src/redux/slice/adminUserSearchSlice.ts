import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { SearchSiteUserRequest } from '@/interfaces/Dto/Admin/SearchSiteUserDto';

export interface AdminUserSearch {
  type: SearchSiteUserRequest['type'];
  value: string;
  recent: {
    type: SearchSiteUserRequest['type'];
    value: string;
  } | null;
}

interface AdminUserSearchState {
  search: AdminUserSearch;
  status: 'idle' | 'error' | 'loading' | 'success';
}

const initialState: AdminUserSearchState = {
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
    setSearch: (state: AdminUserSearchState, action: PayloadAction<AdminUserSearch>) => {
      const { type, value, recent } = action.payload;

      state.search = {
        ...state.search,
        type,
        value,
        recent,
      };
    },
    setSearchStatus: (state: AdminUserSearchState, action: PayloadAction<AdminUserSearchState['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { setSearch, setSearchStatus } = adminUserFilterSlice.actions;

export function useAdminUserSearch() {
  const search = useSelector((state: RootState) => state.adminUserSearch.search);

  const dispatch = useDispatch();

  return {
    search,
    dispatch,
  };
}

export function useAdminUserSearchStatus() {
  const searchStatus = useSelector((state: RootState) => state.adminUserSearch.status);
  const dispatch = useDispatch();

  return {
    searchStatus,
    dispatch,
  };
}

export default adminUserFilterSlice.reducer;
