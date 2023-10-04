'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ISeriesApi } from 'lightweight-charts';
import { LightWeightChart, LightWeightChartLineSeries, LightWeightHistogramSeries } from './LightWeightChart';
import { getSymbolLineChartContainerOptions, getSymbolLineChartSeriesOptions } from './constants/symbolLineChartConfig';
import {
  getSymbolHistogramChartContainerOptions,
  getSymbolHistogramSeriesOptions,
} from './constants/symbolHistogramConfig';
import ChartLoading from './ChartLoding';
import ChartEmpty from './ChartEmpty';
import { DeltaPriceColor, getChartDate, getPriceInfo } from '@/util/chart';
import { createChartData } from '@/service/chart';
import { useChart } from '@/hooks/useChart';
import { setChartPayload, useChartSource } from '@/redux/slice/chartSourceSlice';
import { usePageTab } from '@/redux/slice/pageTabSlice';
import { ChartAreaLeaveEvent } from './constants/event';
import type { Symbol } from '@/interfaces/Symbol';
import type { ChartApiRef } from './LightWeightChart/LightWeightChart';
import type { ChartApiList } from './LightWeightChart/LightWeightChartContainer';

interface ChartProps {
  matchedSymbol?: Symbol | null;
}

function Chart({ matchedSymbol }: ChartProps) {
  const searchParams = useSearchParams();
  const symbolName = searchParams.get('name');

  const { pageTabs } = usePageTab();
  const { dispatch, source } = useChartSource();

  const { startDate, endDate } = getChartDate({ resample: pageTabs.symbolChartPageResampleFrequencyTab });
  const requestSymbolName = matchedSymbol?.symbol?.toUpperCase() ?? (symbolName ? symbolName.toUpperCase() : '');

  /* 
    - 월별, 주별 차트는
      api 에서 응답시간이 좀 걸리기 때문에
      staleTime(10분)을 통해 캐시하고 해당 시간동안
      api로 재요청하지 않도록 개선 함
      (
        부분 적용하지 않고,
        월별 주별 일별 일괄 적용
      )

    - cacheTime을 0으로 설정하는 것을 통해
      fresh->stale(inactive)인 경우
      캐시하지 않고, 다시 요청하도록 함
      (캐시된 값을 보여주면서 
      api 요청를 재 요청, 이후 값으로 갱신되지 않도록 함)
  */
  const {
    charts: chartData,
    status,
    empty,
    refetchChart,
    invalidateQuery,
  } = useChart({
    symbolName: requestSymbolName,
    resample: pageTabs.symbolChartPageResampleFrequencyTab,
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    staleTime: 1000 * 60 * 10,
    cacheTime: 0,
  });

  const lineChartApiRef = useRef<ChartApiRef>(null);
  const histogramChartApiRef = useRef<ChartApiRef>(null);

  const symbolLineChartRef = useRef<ISeriesApi<'Line'>>(null);
  const symbolHistogramChartRef = useRef<ISeriesApi<'Histogram'>>(null);

  const [chartApiList, setChartApiList] = useState<ChartApiList>({
    chartApis: {
      symbolPriceIChartApi: null,
      buzzIChartApi: null,
    },
    seriesApis: {
      symbolPriceLineSeriesApi: null,
      buzzHistogramSeriesApi: null,
    },
  });

  useEffect(() => {
    return () => {
      // clear

      // eslint-disable-next-line
      lineChartApiRef.current?.clear();
      // eslint-disable-next-line
      histogramChartApiRef.current?.clear();

      dispatch(setChartPayload(null));

      /*
        - 뒤로가기 시 렌더링 되는 첫 탭(resample) 이후 
        다시 뒤로가기 시 렌더링 되야되는 탭에서는 
        차트 렌더링자체가 안됨
        해당 상황에서 다른 탭들을 클릭하더라도 렌더링
        자체가 안됨

        - 관련된 전체 쿼리를 무효화 하여
        다시 렌더링 될 수 있도록 함
      */
      invalidateQuery.allResample();
    };
  }, []); /* eslint-disable-line */

  useLayoutEffect(() => {
    if (lineChartApiRef.current?._api && histogramChartApiRef.current?._api) {
      setChartApiList((prev) => ({
        ...prev,
        chartApis: {
          symbolPriceIChartApi: lineChartApiRef.current!._api,
          buzzIChartApi: histogramChartApiRef.current!._api,
        },
      }));
    }

    if (symbolLineChartRef.current && symbolHistogramChartRef.current) {
      setChartApiList((prev) => ({
        ...prev,
        seriesApis: {
          symbolPriceLineSeriesApi: symbolLineChartRef.current,
          buzzHistogramSeriesApi: symbolHistogramChartRef.current,
        },
      }));
    }
  }, [source]);

  useLayoutEffect(() => {
    if (status === 'loading' || status === 'fetching') return;

    if (status === 'error') return;

    const chartSource = createChartData(chartData);

    dispatch(setChartPayload(chartSource));
  }, [chartData, status]); /* eslint-disable-line */

  if (status === 'loading' || status === 'fetching')
    return (
      <div className="space-y-4 divide-y-2 divide-dashed">
        <ChartLoading />
      </div>
    );

  if (empty || status === 'error') return <ChartEmpty refetch={refetchChart} />;

  /* 
    redux의 chartSource를 props로 전달시
    에러가 발생하여
    유틸 함수로 생성한 데이터를 props로 전달 
  */
  const chartSource = createChartData(chartData);

  const priceInfo = getPriceInfo({
    today: matchedSymbol?.price.today ?? ({ close: 0 } as any),
    yesterday: matchedSymbol?.price.yesterday ?? ({ close: 0 } as any),
  });

  return (
    <div
      className="relative"
      id="symbol-chart"
      onMouseLeave={(e) => {
        window.dispatchEvent(ChartAreaLeaveEvent);
      }}
    >
      <LightWeightChart
        ref={lineChartApiRef}
        chartApiList={chartApiList}
        timeMarkerVisible={false}
        tooltipVisible={false}
        markerVisible={true}
        options={{
          ...getSymbolLineChartContainerOptions(pageTabs.symbolChartPageResampleFrequencyTab),
        }}
      >
        <LightWeightChartLineSeries
          ref={symbolLineChartRef}
          lineSeriesOptions={{
            ...getSymbolLineChartSeriesOptions(),
            color: priceInfo ? DeltaPriceColor[priceInfo.delta.type] : DeltaPriceColor.NO_CHANGE,
          }}
          lineChartData={chartSource?.lineData ?? null}
        />
      </LightWeightChart>
      <div className="divide-y-2 divide-dashed divide-[#A7A7A7]">
        <div className="h-2" />
        <div className="h-2 pt-0.5" />
      </div>
      <LightWeightChart
        ref={histogramChartApiRef}
        chartApiList={chartApiList}
        options={{
          ...getSymbolHistogramChartContainerOptions(pageTabs.symbolChartPageResampleFrequencyTab),
        }}
        timeMarkerVisible={true}
        tooltipVisible={true}
      >
        <LightWeightHistogramSeries
          ref={symbolHistogramChartRef}
          histogramChartData={chartSource?.buzzData ?? null}
          histogramSeriesOptions={getSymbolHistogramSeriesOptions()}
        />
      </LightWeightChart>
    </div>
  );
}

export default Chart;
