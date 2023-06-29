'use client';

import { forwardRef, useRef, useLayoutEffect, useImperativeHandle, useState, type ForwardedRef } from 'react';
import {
  createChart,
  type IChartApi,
  type ChartOptions,
  type MouseEventParams,
  LogicalRange,
} from 'lightweight-charts';
import { ChartContext, type ChartContextState } from '@/context/ChartContext';
import ChartTimeMarker, { type TimeMarkerControl } from '../ChartTimeMarker';
import { getTimeMarker } from '@/util/chart';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';
import { ChartTooltip } from '..';
import { ChartTooltipControl, ChartTooltipSource } from '../ChartTooltip';

interface ChartContainerProps {
  resample: ResampleFrequency;
  charts: {
    payload: IChartApi[];
    triggerSize: number;
  };
  options?: Partial<ChartOptions>;
  source?: ChartTooltipSource;
  tooltipVisible?: boolean;
  timeMarkerVisible?: boolean;
  container: HTMLDivElement;
  children: React.ReactNode;
}

function LightWeightChartContainer(
  {
    resample,
    charts,
    source,
    timeMarkerVisible,
    tooltipVisible = true,
    options,
    container,
    children,
  }: ChartContainerProps,
  ref: ForwardedRef<IChartApi>,
) {
  const [context, setContext] = useState<ChartContextState>({ api: null });

  function logicalRangeHandler(this: IChartApi, range: LogicalRange | null, arr: IChartApi[]) {
    const targetCharts = arr.filter((chart) => chart !== this);

    if (range) {
      targetCharts.forEach((chart) => {
        chart.timeScale().setVisibleLogicalRange(range);
      });
    }
  }

  const chartTimeMarkerControlRef = useRef<TimeMarkerControl>(null);
  const chartTooltipControlRef = useRef<ChartTooltipControl>(null);

  const chartAPIRef = useRef<{ _api: IChartApi | null; api: () => IChartApi }>({
    _api: null,
    api() {
      if (!this._api) {
        this._api = createChart(container, { ...options });
        this._api.timeScale().fitContent();
      }

      return this._api;
    },
  });

  useLayoutEffect(() => {
    chartAPIRef.current.api();

    setContext((prev) => ({ ...prev, api: chartAPIRef.current._api }));
  }, []);

  useLayoutEffect(() => {
    if (context.api) {
      chartTimeMarkerControlRef.current?.unmount();
      chartTooltipControlRef.current?.unmount();

      charts.payload.push(context.api);
    }
    if (charts.payload.length === charts.triggerSize) {
      charts.payload.forEach((chart, idx, arr) => {
        function crossHairMoveHandler(param: MouseEventParams) {
          if (!param.point || Number(param.point.x) < 0 || Number(param.point.y) < 0 || !param.time) {
            chartTimeMarkerControlRef.current?.unmount();
            chartTooltipControlRef.current?.unmount();
            return;
          }

          if (param.time) {
            chartTimeMarkerControlRef.current?.display(getTimeMarker(param.time, resample));
            chartTooltipControlRef.current?.display(param.time);

            const coord = chart.timeScale().timeToCoordinate(param.time);

            chartTimeMarkerControlRef.current?.setPosition(coord);
            chartTimeMarkerControlRef.current?.render();

            chartTooltipControlRef.current?.setPosition(coord);
            chartTooltipControlRef.current?.render();
          }
        }

        chart.subscribeCrosshairMove(crossHairMoveHandler);

        chart
          .timeScale()
          .subscribeVisibleLogicalRangeChange((logicalRange) => logicalRangeHandler.call(chart, logicalRange, arr));
      });
    }
  }, [context]); /* eslint-disable-line */

  useImperativeHandle(ref, () => chartAPIRef.current.api());

  return (
    <ChartContext.Provider value={context}>
      {children}
      <ChartTimeMarker
        chartApi={context.api}
        container={container}
        controlRef={chartTimeMarkerControlRef}
        height={context.api?.timeScale().height()}
        visible={timeMarkerVisible}
      />
      <ChartTooltip
        container={container}
        controlRef={chartTooltipControlRef}
        chartApi={context.api}
        width={150}
        height={context.api?.options().height}
        source={source}
        visible={tooltipVisible}
      />
    </ChartContext.Provider>
  );
}

LightWeightChartContainer.displayName = 'LightWeightChartContainer';

export default forwardRef<IChartApi, ChartContainerProps>(LightWeightChartContainer);
