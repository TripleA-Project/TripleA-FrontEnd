import { SentimentData } from '@/service/chart';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HistogramData, LineData } from 'lightweight-charts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

interface ChartSource {
  lineData: LineData[];
  buzzData: HistogramData[];
  sentimentData: SentimentData[];
}

type ChartState = {
  chartPayload: ChartSource | null;
};

const initialState: ChartState = {
  chartPayload: null,
};

const chartSourceSlice = createSlice({
  name: 'chartSource',
  initialState,
  reducers: {
    setChartPayload: (state, action: PayloadAction<ChartState['chartPayload']>) => {
      if (action.payload === null) {
        state.chartPayload = null;

        return;
      }

      state.chartPayload = {
        ...action.payload,
      };
    },
  },
});

export const { setChartPayload } = chartSourceSlice.actions;

export function useChartSource() {
  const { chartPayload: source } = useSelector((root: RootState) => root.chartSource);
  const dispatch = useDispatch();

  return {
    dispatch,
    source,
  };
}

export default chartSourceSlice.reducer;
