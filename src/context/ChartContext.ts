import { IChartApi, ISeriesApi, SeriesOptionsMap } from 'lightweight-charts';
import { createContext } from 'react';

export interface ChartContextState {
  container: HTMLDivElement | null;
  api: IChartApi | null;
  seriesApis: ISeriesApi<keyof SeriesOptionsMap>[];
  timeMarkerVisible: boolean;
  tooltipVisible: boolean;
  markerVisible: boolean;
}

export type Coord = {
  time: number;
  price: number;
};

export const initalContextState: ChartContextState = {
  container: null,
  api: null,
  seriesApis: [],
  timeMarkerVisible: false,
  tooltipVisible: false,
  markerVisible: false,
};

export const ChartContext = createContext<ChartContextState>(initalContextState);
