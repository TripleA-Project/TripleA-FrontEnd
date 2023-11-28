'use client';

import { useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { ChartContext } from '@/context/ChartContext';
import type { ISeriesApi, LineData, LineSeriesOptions } from 'lightweight-charts';

interface LineChartProps {
  lineSeriesOptions?: Partial<LineSeriesOptions>;
  lineChartData: LineData[] | null;
}

const LightWeightLineSeries = forwardRef<ISeriesApi<'Line'>, LineChartProps>(
  ({ lineChartData, lineSeriesOptions }, ref) => {
    const { api } = useContext(ChartContext);

    const selfApiRef = useRef<ISeriesApi<'Line'> | null>(null);

    useImperativeHandle(ref, () => {
      if (selfApiRef.current) {
        try {
          selfApiRef.current.setData(lineChartData ?? []);
        } catch (e) {
          selfApiRef.current.setData([]);
        } finally {
          api?.timeScale().fitContent();
        }

        return selfApiRef.current;
      }

      const lineSeries = api?.addLineSeries({ ...lineSeriesOptions }) ?? null;

      if (lineSeries !== null) {
        try {
          lineSeries.setData(lineChartData ?? []);
        } catch (e) {
          lineSeries.setData([]);
        } finally {
          api?.timeScale().fitContent();
        }
      }

      selfApiRef.current = lineSeries;

      return selfApiRef.current!;
    });

    return null;
  },
);

LightWeightLineSeries.displayName = 'LightWeightLineSeries';

export default LightWeightLineSeries;
