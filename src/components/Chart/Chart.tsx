'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { type ISeriesApi, type IChartApi, type LineData, type HistogramData } from 'lightweight-charts';
import { BsArrowRightShort } from 'react-icons/bs';
import { LightWeightChart, LightWeightChartLineSeries, LightWeightHistogramSeries } from './LightWeightChart';
import { ChartWrapper, ChartResampleGroup, ChartNotify, ChartLoading } from '@/components/Chart';
import { type SentimentData, getSymbolChartData } from '@/service/chart';
import { getSymbolLineChartContainerOptions, getSymbolLineChartSeriesOptions } from './constants/symbolLineChartConfig';
import {
  getSymbolHistogramChartContainerOptions,
  getSymbolHistogramSeriesOptions,
} from './constants/symbolHistogramConfig';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';
import { DeltaPriceColor, getPriceInfo } from '@/util/chart';
import ChartHeader, { ChartHeaderLoading } from './ChartHeader';
import { type SearchSymbolNewsResponse } from '@/interfaces/Dto/News';
import { AxiosError } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';

interface ChartProps {
  symbol: string;
  data?: {
    news: SearchSymbolNewsResponse;
  };
  resample: ResampleFrequency;
}

function Chart({ symbol, resample, data }: ChartProps) {
  const [authState, setAuthState] = useState<'pending' | 'notAllowed' | 'loginRequired' | 'AuthUser'>('pending');
  const [source, setSource] = useState<{
    lineData?: LineData[];
    buzzData?: HistogramData[];
    sentimentData?: SentimentData[];
  }>({ lineData: undefined, buzzData: undefined, sentimentData: undefined });

  const lineChartApiRef = useRef<IChartApi>(null);
  const histogramChartApiRef = useRef<IChartApi>(null);

  const symbolLineChartRef = useRef<ISeriesApi<'Line'>>(null);
  const symbolHistogramChartRef = useRef<ISeriesApi<'Histogram'>>(null);

  const startDate = dayjs(`${dayjs().get('year')}-01-01`);
  const endDate = dayjs();

  const charts = {
    payload: [] as IChartApi[],
    triggerSize: 2,
  };

  const {
    data: response,
    status: chartDataStatus,
    error: chartDataError,
  } = useQuery(
    ['symbolChart', symbol, resample],
    () =>
      getSymbolChartData({
        symbol,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        resampleFreq: resample,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    },
  );

  const {
    data: priceInfo,
    status,
    error,
  } = useQuery(
    ['symbolChart', symbol, 'priceInfo'],
    () => getPriceInfo({ symbol, startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD') }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
      enabled: chartDataStatus === 'success',
    },
  );

  useLayoutEffect(() => {
    if (chartDataStatus === 'error') {
      if ((chartDataError as AxiosError<APIResponse>).response?.data.data!.includes('구독 확인 실패')) {
        setAuthState('notAllowed');
        return;
      }
      setAuthState('loginRequired');
      return;
    }
    if (response && response.membership === 'BASIC' && authState !== 'notAllowed') {
      setAuthState('notAllowed');
      return;
    }

    setSource((prev) => ({ ...prev, ...response?.payload }));
  }, [chartDataStatus, response]); /* eslint-disable-line */

  useLayoutEffect(() => {
    if (authState === 'pending' || authState === 'AuthUser') return;

    document.body.style.overflow = 'hidden';

    const handleScroll = (e: Event) => {
      if (window.scrollY !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
      const overflow = document.body.style.overflow;
      if (overflow !== 'hidden') document.body.style.overflow = 'hidden';

      e.preventDefault();
      e.stopImmediatePropagation();
    };

    window.addEventListener('scroll', handleScroll, { capture: true });

    return () => {
      document.body.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [authState]);

  return (
    <div
      className={`${
        authState !== 'pending' && authState !== 'AuthUser' ? 'overflow-hidden' : 'overflow-auto'
      } box-border px-4 pt-4`}
    >
      {chartDataStatus === 'loading' ? (
        <ChartHeaderLoading />
      ) : (
        <ChartHeader
          symbol={symbol}
          companyName={response?.companyName}
          priceInfo={priceInfo ?? { delta: { type: 'NO_CHANGE', value: 0, percent: 0 }, close: 0 }}
          sentimentData={response?.payload?.sentimentData ?? []}
        />
      )}
      <ChartWrapper blur={authState !== 'pending' && authState !== 'AuthUser'}>
        {chartDataStatus === 'loading' || authState === 'loginRequired' ? <ChartLoading /> : null}
        {chartDataStatus !== 'loading' && authState !== 'loginRequired' ? (
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
                lineChartData={response?.payload?.lineData ?? []}
              />
            </LightWeightChart>
            <div className="pt-4">
              <LightWeightChart
                ref={histogramChartApiRef}
                charts={charts}
                resample={resample}
                options={getSymbolHistogramChartContainerOptions(resample)}
                source={source}
                timeMarkerVisible={true}
                tooltipVisible={true}
              >
                <LightWeightHistogramSeries
                  ref={symbolHistogramChartRef}
                  histogramChartData={response?.payload?.buzzData ?? []}
                  histogramSeriesOptions={getSymbolHistogramSeriesOptions()}
                />
              </LightWeightChart>
            </div>
          </div>
        ) : null}
        <ChartResampleGroup symbol={symbol} />
        <div>
          {chartDataStatus === 'success' ? (
            <div className="mb-11 mt-5">
              <p className="font-bold text-black">{response.symbol.toUpperCase()} 관련 뉴스</p>
              {data?.news.data?.news?.map((news) => {
                return <div key={news.title}>{news.title}</div>;
              })}
              <Link href={`/chart/symbol/${symbol}/news`} className="mt-5 flex items-center justify-center">
                <button className="box-border flex h-10 w-[311px] items-center justify-center rounded-3xl border-2 border-[#E2E6ED] px-4 py-3">
                  <p className="mr-5 font-bold">뉴스 전체보기</p>
                  <BsArrowRightShort className="shrink-0 text-2xl" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="mb-11 mt-5">
              <div
                role="status"
                className="animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <span className="sr-only"></span>
              </div>
            </div>
          )}
        </div>
      </ChartWrapper>
      {authState === 'notAllowed' ? (
        <ChartNotify
          title="구독제 회원만 열람 가능"
          content="멤버십 회원이 되어 무제한 이용해보세요!"
          buttonText="지금 바로 구독하기"
          linkTarget="/"
        />
      ) : null}
      {authState === 'loginRequired' ? (
        <ChartNotify
          title="로그인이 필요합니다"
          content="로그인 후 이용해주세요"
          buttonText="로그인하러 가기"
          linkTarget="/login"
        />
      ) : null}
    </div>
  );
}

export default Chart;
