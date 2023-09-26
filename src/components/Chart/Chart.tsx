'use client';

import React, { useEffect, useRef } from 'react';
import { ResampleFrequency } from '@/interfaces/Dto/Stock';
import { DeltaPriceColor, getChartDate, getPriceInfo } from '@/util/chart';
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
import useChart from '@/hooks/useChart';
import ChartEmpty from './ChartEmpty';
import { setChartPayload, useChartSource } from '@/redux/slice/chartSourceSlice';

interface ChartSource {
  lineData?: LineData[];
  buzzData?: HistogramData[];
  sentimentData?: SentimentData[];
}

interface ChartProps {
  matchedSymbol?: Symbol | null;
  resample: ResampleFrequency;
}

function Chart({ matchedSymbol, resample }: ChartProps) {
  const searchParams = useSearchParams();
  const symbolName = searchParams.get('name');

  const { startDate, endDate } = getChartDate({ resample });
  const requestSymbolName = matchedSymbol?.symbol?.toUpperCase() ?? (symbolName ? symbolName.toUpperCase() : '');

  const { dispatch } = useChartSource();

  const {
    charts: chartData,
    status,
    empty,
  } = useChart({
    symbolName: requestSymbolName,
    resample,
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    cacheTime: 0,
  });

  const lineChartApiRef = useRef<IChartApi>(null);
  const histogramChartApiRef = useRef<IChartApi>(null);

  const symbolLineChartRef = useRef<ISeriesApi<'Line'>>(null);
  const symbolHistogramChartRef = useRef<ISeriesApi<'Histogram'>>(null);

  useEffect(() => {
    if (status === 'loading' || status === 'fetching') return;

    if (status === 'error') return;

    const source = createChartData(chartData);

    dispatch(setChartPayload(source));
  }, [chartData, status]); /* eslint-disable-line */

  if (status === 'loading' || status === 'fetching')
    return (
      <div className="space-y-4 divide-y-2 divide-dashed">
        <ChartLoading />
      </div>
    );

  if (empty || status === 'error') return <ChartEmpty />;

  const source = createChartData(chartData);

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
      </div>
    </div>
  );
}

export default Chart;
