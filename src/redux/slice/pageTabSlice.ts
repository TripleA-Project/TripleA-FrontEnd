import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { MainPageNewsTab } from '@/components/News/NewsTab';
import type { ChartHomeTab } from '@/components/Chart/ChartPageHome';
import { ResampleFrequency } from '@/interfaces/Dto/Stock';

type PageTabState = {
  mainPageTab: MainPageNewsTab;
  chartPageHomeTab: ChartHomeTab;
  symbolChartPageResampleFrequencyTab: ResampleFrequency;
};

const initialState: PageTabState = {
  mainPageTab: 'latestNews',
  chartPageHomeTab: 'likedSymbols',
  symbolChartPageResampleFrequencyTab: 'daily',
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
    setSymbolChartPageResampleFrequencyTab: (
      state,
      action: PayloadAction<PageTabState['symbolChartPageResampleFrequencyTab']>,
    ) => {
      state.symbolChartPageResampleFrequencyTab = action.payload;
    },
  },
});

export const { setMainPageTab, setChartPageHomeTab, setSymbolChartPageResampleFrequencyTab } = pageTabSlice.actions;

export function usePageTab() {
  const dispatch = useDispatch();
  const pageTabs = useSelector((state: RootState) => state.pageTab);

  return {
    dispatch,
    pageTabs,
  };
}

export default pageTabSlice.reducer;
