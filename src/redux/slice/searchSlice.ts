import { Symbol } from '@/interfaces/Symbol';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';

type SearchState = {
  searchValue: string;
};
const initialState: SearchState = {
  searchValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeywordData: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchKeywordData } = searchSlice.actions;

export function useSearch() {
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const dispatch = useDispatch();

  return {
    searchValue,
    dispatch,
  };
}

export default searchSlice.reducer;
