'use client';

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
  useContext,
  useLayoutEffect,
} from 'react';
import LightWeightChartContainer, { ChartApiList } from './LightWeightChartContainer';
import {
  createChart,
  type ChartOptions,
  type DeepPartial,
  type IChartApi,
  type Time,
  ISeriesApi,
  SeriesOptionsMap,
} from 'lightweight-charts';
import { ChartContext, ChartContextState, initalContextState } from '@/context/ChartContext';
import { getTimeMarker } from '@/util/chart';
import { useSearchParams } from 'next/navigation';
import { ResampleFrequency } from '@/interfaces/Dto/Stock';

export interface ChartApiRef {
  _api: IChartApi | null;
  _container: HTMLDivElement | null;
  _seriesApis: ISeriesApi<keyof SeriesOptionsMap>[];
  clear: () => void;
}

export interface ChartProps {
  chartApiList: ChartApiList;
  tooltipVisible?: boolean;
  timeMarkerVisible?: boolean;
  markerVisible?: boolean;
  options?: DeepPartial<ChartOptions>;
  children: React.ReactNode;
}

function LightWeightChart(
  {
    chartApiList,
    options,
    timeMarkerVisible = false,
    tooltipVisible = false,
    markerVisible = false,
    children,
  }: ChartProps,
  ref: ForwardedRef<ChartApiRef>,
) {
  const [context, setContext] = useState<ChartContextState>({
    ...initalContextState,
    timeMarkerVisible,
    tooltipVisible,
    markerVisible,
  });

  const resample = (useSearchParams().get('resample') || 'daily') as ResampleFrequency;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<ChartApiRef>({
    _api: null,
    _container: null,
    _seriesApis: [],
    clear() {},
  });

  useImperativeHandle(ref, () => {
    if (!chartApiRef.current._api) {
      const chartOptions = { height: 322 / 2, ...options } as ChartOptions;

      chartApiRef.current._api = createChart(chartContainerRef.current!, { ...chartOptions });
    }

    if (!chartApiRef.current._container) {
      chartApiRef.current._container = chartContainerRef.current;
    }

    if (chartApiRef.current._seriesApis.length !== context.seriesApis.length) {
      chartApiRef.current._seriesApis = [...context.seriesApis];
    }

    chartApiRef.current._api.applyOptions({
      timeScale: {
        tickMarkFormatter: (time: Time) => getTimeMarker(time, resample),
      },
    });

    chartApiRef.current.clear = () => {
      chartApiRef.current._api?.remove();
      chartApiRef.current._container = null;

      chartApiRef.current._seriesApis.forEach((api) => api.setData([]));
      chartApiRef.current._seriesApis = [];

      setContext((prev) => ({ ...prev, container: null, api: null, seriesApis: [] }));
    };

    return chartApiRef.current;
  });

  useLayoutEffect(() => {
    if (!context.api && !context.container) {
      setContext((prev) => ({ ...prev, api: chartApiRef.current._api, container: chartApiRef.current._container }));
    }

    if (Array.isArray(children)) {
      const seriesApiRefs = children.filter((c) => !!c?.ref?.current?.seriesType).map((c) => c?.ref.current);

      if (context.seriesApis.length < seriesApiRefs.length) {
        setContext((prev) => ({ ...prev, seriesApis: [...prev.seriesApis, ...seriesApiRefs] }));
      }

      return;
    }

    if (!Array.isArray(children) && !context.seriesApis.length) {
      const seriesApiRef = (children as React.ReactElement & { ref: any })?.ref.current;

      if (!!seriesApiRef?.seriesType) {
        setContext((prev) => ({ ...prev, seriesApis: [...prev.seriesApis, seriesApiRef] }));
      }

      return;
    }
  }, [context, children]); /* eslint-disable-line */

  return (
    <div ref={chartContainerRef} className="relative">
      <ChartContext.Provider value={context}>
        <LightWeightChartContainer chartApiList={chartApiList}>{children}</LightWeightChartContainer>
      </ChartContext.Provider>
    </div>
  );
}

export default forwardRef(LightWeightChart);
