'use client';

import React, { type ForwardedRef, type MutableRefObject, forwardRef, useImperativeHandle } from 'react';
import { LightWeightChart } from './LightWeightChart';
import SymbolChartContainer from './SymbolChartContainer';
import { useSearchParams } from 'next/navigation';
import { getTimeMarker } from '@/util/chart';
import type { ChartApiRef, ChartProps } from './LightWeightChart/LightWeightChart';
import type { ResampleFrequency } from '@/interfaces/Dto/Stock';
import type { ChartApiList } from './SymbolChartContainer';
import type { Time } from 'lightweight-charts';

interface SymbolChartProps extends ChartProps {
  chartApiList: ChartApiList;
}

function SymbolChart(
  { chartApiList, options, timeMarkerVisible, tooltipVisible, markerVisible, children }: SymbolChartProps,
  ref: ForwardedRef<ChartApiRef>,
) {
  const resample = (useSearchParams().get('resample') || 'daily') as ResampleFrequency;

  useImperativeHandle(ref, () => {
    const forwardRef = ref as MutableRefObject<ChartApiRef>;

    forwardRef?.current?._api?.applyOptions({
      timeScale: {
        tickMarkFormatter: (time: Time) => getTimeMarker(time, resample),
      },
    });

    return {
      _api: forwardRef?.current?._api,
      _container: forwardRef?.current?._container,
      _seriesApis: forwardRef?.current?._seriesApis,
      clear() {},
    };
  });

  return (
    <LightWeightChart
      ref={ref}
      options={{ ...options, height: 322 / 2 }}
      timeMarkerVisible={timeMarkerVisible}
      tooltipVisible={tooltipVisible}
      markerVisible={markerVisible}
    >
      <SymbolChartContainer chartApiList={chartApiList}>{children}</SymbolChartContainer>
    </LightWeightChart>
  );
}

export default forwardRef(SymbolChart);
