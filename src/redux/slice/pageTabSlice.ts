import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { TabPage } from '@/components/News/NewsTab';
import type { ChartHomeTab } from '@/components/Chart/ChartPageHome';

type PageTabState = {
  mainPageTab: TabPage;
  chartPageHomeTab: ChartHomeTab;
};

const initialState: PageTabState = {
  mainPageTab: 'latestNews',
  chartPageHomeTab: 'likedSymbols',
};

const pageTabSlice = createSlice({
  name: 'pageTab',
  initialState,
  reducers: {
    setMainPageTab: (state, action: PayloadAction<PageTabState['mainPageTab']>) => {
      state.mainPageTab = action.payload;
    },
    setChartPageHomeTab: (state, action: PayloadAction<PageTabState['chartPageHomeTab']>) => {
      state.chartPageHomeTab = action.payload;
    },
  },
});

export const { setMainPageTab, setChartPageHomeTab } = pageTabSlice.actions;

export function usePageTab() {
  const dispatch = useDispatch();
  const pageTabs = useSelector((state: RootState) => state.pageTab);

  return {
    dispatch,
    pageTabs,
  };
}

export default pageTabSlice.reducer;
