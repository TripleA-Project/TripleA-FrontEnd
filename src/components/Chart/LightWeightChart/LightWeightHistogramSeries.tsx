'use client';

import { useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { ChartContext } from '@/context/ChartContext';
import type { ISeriesApi, HistogramData, HistogramSeriesOptions } from 'lightweight-charts';

interface HistogramChartProps {
  histogramSeriesOptions?: Partial<HistogramSeriesOptions>;
  histogramChartData: HistogramData[] | null;
}

const LightWeightHistogramSeries = forwardRef<ISeriesApi<'Histogram'>, HistogramChartProps>(
  ({ histogramChartData, histogramSeriesOptions }, ref) => {
    const { api } = useContext(ChartContext);

    const selfApiRef = useRef<ISeriesApi<'Histogram'> | null>(null);

    useImperativeHandle(ref, () => {
      if (selfApiRef.current) {
        try {
          selfApiRef.current.setData(histogramChartData ?? []);
        } catch (e) {
          selfApiRef.current.setData([]);
        } finally {
          api?.timeScale().fitContent();
        }

        return selfApiRef.current;
      }

      const histogramSeries = api?.addHistogramSeries({ ...histogramSeriesOptions }) ?? null;

      if (histogramSeries !== null) {
        try {
          histogramSeries.setData(histogramChartData ?? []);
        } catch (e) {
          histogramSeries.setData([]);
        } finally {
          api?.timeScale().fitContent();
        }
      }

      selfApiRef.current = histogramSeries;

      return selfApiRef.current!;
    });

    return null;
  },
);

LightWeightHistogramSeries.displayName = 'LightWeightHistogramSeries';

export default LightWeightHistogramSeries;
