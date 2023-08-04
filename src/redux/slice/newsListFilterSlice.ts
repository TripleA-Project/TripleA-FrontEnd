import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type NewsView } from '@/components/News/LatestNews/ViewFilter';

type NewsListFilterState = {
  filter: {
    view: NewsView;
  };
};

type FilterPayload = NewsListFilterState['filter'];

const initialState: NewsListFilterState = {
  filter: {
    view: 'box',
  },
};

export const newsListFilterSlice = createSlice({
  name: 'newsListFilter',
  initialState,
  reducers: {
    setView: (state: NewsListFilterState, action: PayloadAction<FilterPayload>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
  },
});

export const { setView } = newsListFilterSlice.actions;

// 커스텀 훅 형태로 만들어주기 (Hooks 폴더로 따로 빼도 됨)
export function useNewsListFilter() {
  const newsListFilter = useSelector((state: RootState) => state.newsListFilter);
  const dispatch = useDispatch();

  return {
    ...newsListFilter,
    dispatch,
  };
}

export default newsListFilterSlice.reducer;
