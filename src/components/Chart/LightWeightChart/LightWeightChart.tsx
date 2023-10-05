'use client';

import { useRef, useState, forwardRef, useImperativeHandle, useLayoutEffect, type ForwardedRef } from 'react';
import {
  createChart,
  type ChartOptions,
  type DeepPartial,
  type IChartApi,
  type ISeriesApi,
  type SeriesOptionsMap,
} from 'lightweight-charts';
import { ChartContext, ChartContextState, initalContextState } from '@/context/ChartContext';

export interface ChartApiRef {
  _api: IChartApi | null;
  _container: HTMLDivElement | null;
  _seriesApis: ISeriesApi<keyof SeriesOptionsMap>[];
  clear: () => void;
}

export interface ChartProps {
  tooltipVisible?: boolean;
  timeMarkerVisible?: boolean;
  markerVisible?: boolean;
  options?: DeepPartial<ChartOptions>;
  children: React.ReactNode;
}

function LightWeightChart(
  { options, timeMarkerVisible = false, tooltipVisible = false, markerVisible = false, children }: ChartProps,
  ref: ForwardedRef<ChartApiRef>,
) {
  const [context, setContext] = useState<ChartContextState>({
    ...initalContextState,
    timeMarkerVisible,
    tooltipVisible,
    markerVisible,
  });

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<ChartApiRef>({
    _api: null,
    _container: null,
    _seriesApis: [],
    clear() {},
  });

  useImperativeHandle(ref, () => {
    if (!chartApiRef.current._api) {
      const chartOptions = { ...options } as ChartOptions;

      chartApiRef.current._api = createChart(chartContainerRef.current!, { ...chartOptions });
    }

    if (!chartApiRef.current._container) {
      chartApiRef.current._container = chartContainerRef.current;
    }

    if (chartApiRef.current._seriesApis.length !== context.seriesApis.length) {
      chartApiRef.current._seriesApis = [...context.seriesApis];
    }

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
      const seriesApiRef = (children as React.ReactElement & { ref: any })?.ref?.current;

      if (!!seriesApiRef?.seriesType) {
        setContext((prev) => ({ ...prev, seriesApis: [...prev.seriesApis, seriesApiRef] }));
      }

      return;
    }
  }, [context, children]); /* eslint-disable-line */

  return (
    <div ref={chartContainerRef} className="relative">
      <ChartContext.Provider value={context}>{children}</ChartContext.Provider>
    </div>
  );
}

export default forwardRef(LightWeightChart);
