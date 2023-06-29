'use client';

import { useContext, forwardRef } from 'react';
import { ChartContext } from '@/context/ChartContext';
import { type ISeriesApi, type LineData, type LineSeriesOptions } from 'lightweight-charts';

interface LineChartProps {
  lineSeriesOptions?: Partial<LineSeriesOptions>;
  lineChartData: LineData[];
}

const LightWeightLineSeries = forwardRef<ISeriesApi<'Line'>, LineChartProps>(
  ({ lineChartData, lineSeriesOptions }, ref) => {
    const { api } = useContext(ChartContext);

    const lineSeries = api?.addLineSeries({ ...lineSeriesOptions }) ?? null;

    if (lineSeries !== null) {
      if (lineChartData) {
        try {
          lineSeries?.setData(lineChartData);
          api?.timeScale().fitContent();
        } catch (e) {
          lineSeries?.setData(lineChartData);
          api?.timeScale().fitContent();
        }
      }

      (ref as React.MutableRefObject<ISeriesApi<'Line'>>).current = lineSeries;
    }

    return null;
  },
);

LightWeightLineSeries.displayName = 'LightWeightLineSeries';

export default LightWeightLineSeries;
