import { IChartApi } from 'lightweight-charts';
import { createContext } from 'react';

export interface ChartContextState {
  api: IChartApi | null;
}

const initalContextState: ChartContextState = {
  api: null,
};

export const ChartContext = createContext<ChartContextState>(initalContextState);
