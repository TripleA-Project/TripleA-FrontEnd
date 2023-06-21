'use client';

import { useContext, forwardRef } from 'react';
import { type ISeriesApi, type LineData, type LineSeriesOptions } from 'lightweight-charts';
import { ChartContext } from '@/context/ChartContext';

interface LineChartProps {
  lineSeriesOptions?: Partial<LineSeriesOptions>;
  lineChartData: LineData[];
}

const LightWeightLineSeries = forwardRef<ISeriesApi<'Line'>, LineChartProps>(
  ({ lineChartData, lineSeriesOptions }, ref) => {
    const { api } = useContext(ChartContext);

    const lineSeries = api?.addLineSeries({ ...lineSeriesOptions }) ?? null;

    if (lineSeries !== null) {
      lineChartData && lineSeries.setData(lineChartData);

      (ref as React.MutableRefObject<ISeriesApi<'Line'>>).current = lineSeries;
    }

    return null;
  },
);

LightWeightLineSeries.displayName = 'LightWeightLineSeries';

export default LightWeightLineSeries;
