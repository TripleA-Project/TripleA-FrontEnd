'use client';

import { useContext, forwardRef } from 'react';
import { type ISeriesApi, type HistogramData, type HistogramSeriesOptions } from 'lightweight-charts';
import { ChartContext } from '@/context/ChartContext';

interface HistogramChartProps {
  histogramSeriesOptions?: Partial<HistogramSeriesOptions>;
  histogramChartData: HistogramData[];
}

const LightWeightHistogramSeries = forwardRef<ISeriesApi<'Histogram'>, HistogramChartProps>(
  ({ histogramChartData, histogramSeriesOptions }, ref) => {
    const { api } = useContext(ChartContext);

    const histogramSeries = api?.addHistogramSeries({ ...histogramSeriesOptions }) ?? null;

    if (histogramSeries !== null) {
      if (histogramChartData) {
        try {
          histogramSeries.setData(histogramChartData);
          api?.timeScale().fitContent();
        } catch (e) {
          histogramSeries.setData(histogramChartData);
          api?.timeScale().fitContent();
        }
      }

      (ref as React.MutableRefObject<ISeriesApi<'Histogram'>>).current = histogramSeries;
    }

    return null;
  },
);

LightWeightHistogramSeries.displayName = 'LightWeightHistogramSeries';

export default LightWeightHistogramSeries;
