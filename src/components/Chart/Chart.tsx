'use client';

import React, { useEffect, useRef } from 'react';
import { ResampleFrequency } from '@/interfaces/Dto/Stock';
import { DeltaPriceColor, getChartDate, getPriceInfo } from '@/util/chart';
import { useQuery } from '@tanstack/react-query';
import { getSymbolStock } from '@/service/stock';
import { SentimentData, createChartData } from '@/service/chart';
import { HistogramData, IChartApi, ISeriesApi, LineData } from 'lightweight-charts';
import { LightWeightChart, LightWeightChartLineSeries, LightWeightHistogramSeries } from './LightWeightChart';
import { getSymbolLineChartContainerOptions, getSymbolLineChartSeriesOptions } from './constants/symbolLineChartConfig';
import {
  getSymbolHistogramChartContainerOptions,
  getSymbolHistogramSeriesOptions,
} from './constants/symbolHistogramConfig';
import { Symbol } from '@/interfaces/Symbol';
import ChartLoading from './ChartLoding';
import { useSearchParams } from 'next/navigation';

interface ChartSource {
  lineData?: LineData[];
  buzzData?: HistogramData[];
  sentimentData?: SentimentData[];
}

interface TestChartProps {
  matchedSymbol?: Symbol | null;
  resample: ResampleFrequency;
  onDataFetched: (source: ChartSource | null, error?: unknown) => void;
}

function Chart({ matchedSymbol, resample, onDataFetched }: TestChartProps) {
  const searchParams = useSearchParams();
  const symbolName = searchParams.get('name');

  const { startDate, endDate } = getChartDate({ resample });
  const requestSymbolName = matchedSymbol?.symbol?.toUpperCase() ?? (symbolName ? symbolName.toUpperCase() : '');

  const {
    data: chartDataPayload,
    isLoading,
    isFetching,
    status,
    error,
  } = useQuery(
    ['symbolChart', requestSymbolName, resample],
    () =>
      getSymbolStock({
        symbol: requestSymbolName,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        resampleFreq: resample,
      }),
    {
      retry: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  const lineChartApiRef = useRef<IChartApi>(null);
  const histogramChartApiRef = useRef<IChartApi>(null);

  const symbolLineChartRef = useRef<ISeriesApi<'Line'>>(null);
  const symbolHistogramChartRef = useRef<ISeriesApi<'Histogram'>>(null);

  useEffect(() => {
    if (isLoading || isFetching) return;

    const source = createChartData(chartDataPayload?.data);

    if (error) {
      onDataFetched(source, error);

      return;
    }

    onDataFetched(source);
  }, [chartDataPayload, status]); /* eslint-disable-line */

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4 divide-y-2 divide-dashed">
        <ChartLoading />
      </div>
    );
  }

  if (!chartDataPayload) return null;

  const source = createChartData(chartDataPayload.data);

  const priceInfo = getPriceInfo({
    today: matchedSymbol?.price.today ?? ({ close: 0 } as any),
    yesterday: matchedSymbol?.price.yesterday ?? ({ close: 0 } as any),
  });

  const charts = {
    payload: [] as IChartApi[],
    triggerSize: 2,
  };

  return (
    <div className="relative">
      <div className="space-y-4 divide-y-2 divide-dashed">
        <>
          <LightWeightChart
            ref={lineChartApiRef}
            charts={charts}
            resample={resample}
            timeMarkerVisible={false}
            tooltipVisible={false}
            options={getSymbolLineChartContainerOptions(resample)}
          >
            <LightWeightChartLineSeries
              ref={symbolLineChartRef}
              lineSeriesOptions={{
                ...getSymbolLineChartSeriesOptions(),
                color: priceInfo ? DeltaPriceColor[priceInfo.delta.type] : DeltaPriceColor.NO_CHANGE,
              }}
              lineChartData={source?.lineData ? [...source.lineData] : []}
            />
          </LightWeightChart>
          <div className="pt-4">
            <LightWeightChart
              ref={histogramChartApiRef}
              charts={charts}
              resample={resample}
              options={getSymbolHistogramChartContainerOptions(resample)}
              source={source ?? { lineData: undefined, buzzData: undefined, sentimentData: undefined }}
              timeMarkerVisible={true}
              tooltipVisible={true}
            >
              <LightWeightHistogramSeries
                ref={symbolHistogramChartRef}
                histogramChartData={source?.buzzData ? [...source.buzzData] : []}
                histogramSeriesOptions={getSymbolHistogramSeriesOptions()}
              />
            </LightWeightChart>
          </div>
        </>
      </div>
    </div>
  );
}

export default Chart;
