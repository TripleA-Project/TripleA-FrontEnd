'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';
import { BsArrowRightShort } from 'react-icons/bs';
import ChartHeader, { ChartHeaderLoading } from './ChartHeader';
import { ToastContainer } from 'react-toastify';
import { LightWeightChart, LightWeightChartLineSeries, LightWeightHistogramSeries } from './LightWeightChart';
import { type ISeriesApi, type IChartApi, type LineData, type HistogramData } from 'lightweight-charts';
import { ChartResampleGroup, ChartLoading } from '@/components/Chart';
import NewsList, { NewsListLoading } from '../News/NewsList';
import { LockNotification } from '../Notification';
import TimeoutNotification from '../Notification/TimeoutNotification';
import { type SentimentData, createChartData } from '@/service/chart';
import { getSymbolStock } from '@/service/stock';
import { searchSymbolNews } from '@/service/news';
import { DeltaPriceColor, getPriceInfo } from '@/util/chart';
import { getSymbolLineChartContainerOptions, getSymbolLineChartSeriesOptions } from './constants/symbolLineChartConfig';
import {
  getSymbolHistogramChartContainerOptions,
  getSymbolHistogramSeriesOptions,
} from './constants/symbolHistogramConfig';
import { LockNotificationTemplate, ServerErrorNotificationTemplate } from '@/constants/notification';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';
import { type Symbol } from '@/interfaces/Symbol';
import { HttpStatusCode, isAxiosError } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';
import { TIMEOUT_CODE } from '@/service/axios';

interface ChartSource {
  lineData?: LineData[];
  buzzData?: HistogramData[];
  sentimentData?: SentimentData[];
}

interface ChartProps {
  symbol: Symbol;
  resample: ResampleFrequency;
}

function getChartDate({ resample }: { resample: ResampleFrequency }) {
  const today = dayjs();

  switch (resample) {
    case 'daily':
      return {
        startDate: today.set('month', today.get('month') - 1).set('date', 1),
        endDate: today.clone(),
      };
    case 'weekly':
      return {
        startDate: today.set('month', today.get('month') - 3).set('date', 1),
        endDate: today.clone(),
      };
    case 'monthly':
      return {
        startDate: dayjs(`${today.get('year')}-01-01`),
        endDate: today.clone(),
      };
    case 'annually':
      return {
        startDate: dayjs(`${today.get('year') - 5}-01-01`),
        endDate: today.clone(),
      };
  }
}

function Chart({ symbol, resample }: ChartProps) {
  const { startDate, endDate } = getChartDate({ resample });

  const {
    data: chartDataPayload,
    status: chartDataStatus,
    error: chartDataError,
  } = useQuery(
    ['symbolChart', symbol.symbol.toUpperCase(), resample],
    () =>
      getSymbolStock({
        symbol: symbol.symbol,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        resampleFreq: resample,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
      select(response) {
        return response.data;
      },
    },
  );

  const { data: symbolShortNews } = useQuery(
    ['symbol', 'news', 'short', symbol.symbol.toUpperCase()],
    () => searchSymbolNews({ symbol: symbol.symbol, size: 3 }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );

  const [subscribeNotification, setSubscribeNotification] = useState<{
    active: boolean;
    dimHeight?: number;
    type: 'FailStepPayInfo' | 'Chart';
  }>({ active: false, type: 'Chart' });

  const [timeoutNotification, setTimeoutNotification] = useState<{ active: boolean; dimHeight?: number }>({
    active: false,
  });

  const [source, setSource] = useState<ChartSource | null>(null);

  const [isRender, setIsRender] = useState(false);

  const lineChartApiRef = useRef<IChartApi>(null);
  const histogramChartApiRef = useRef<IChartApi>(null);

  const symbolLineChartRef = useRef<ISeriesApi<'Line'>>(null);
  const symbolHistogramChartRef = useRef<ISeriesApi<'Histogram'>>(null);

  const charts = {
    payload: [] as IChartApi[],
    triggerSize: 2,
  };

  const priceInfo = getPriceInfo({ today: symbol.price.today, yesterday: symbol.price.yesterday });

  useEffect(() => {
    if (chartDataStatus === 'loading') return;

    if (chartDataStatus === 'error') {
      if (isAxiosError<APIResponse>(chartDataError)) {
        const { code, response } = chartDataError;

        if (response) {
          if (response.data?.status === HttpStatusCode.Unauthorized) {
            redirect(`/login?continueURL=${location.href}`);
          }

          if (response.data.data?.includes('구독 확인 실패')) {
            setSubscribeNotification((prev) => ({
              ...prev,
              active: true,
              type: 'FailStepPayInfo',
              dimHeight: document.querySelector('header')!.getBoundingClientRect().height,
            }));

            return;
          }
        }

        if (code === TIMEOUT_CODE) {
          setTimeoutNotification((prev) => ({
            ...prev,
            active: true,
            dimHeight: document.querySelector('header')!.getBoundingClientRect().height,
          }));
        }
      }
      return;
    }

    if (chartDataPayload.status === HttpStatusCode.Unauthorized) {
      redirect(`/login?continueURL=${location.href}`);
    }

    const chartDataSource = createChartData(chartDataPayload.data);

    if (chartDataPayload.data?.membership === 'BASIC') {
      setSubscribeNotification((prev) => ({
        ...prev,
        active: true,
        type: 'Chart',
        dimHeight: document.querySelector('header')!.getBoundingClientRect().height,
      }));

      setTimeout(() => {
        setSource(chartDataSource);
        setIsRender(true);
      }, 100);

      return;
    }

    setSource(chartDataSource);
    setIsRender(true);
  }, [chartDataStatus, chartDataPayload]); /* eslint-disable-line */

  return (
    <div className={`box-border px-4`}>
      <section className="mt-4">
        {!isRender ? (
          <ChartHeaderLoading />
        ) : (
          <ChartHeader
            symbol={symbol.symbol}
            companyName={symbol.companyName}
            priceInfo={priceInfo ?? { delta: { type: 'NO_CHANGE', value: 0, percent: 0 }, close: 0 }}
            sentimentData={source?.sentimentData ?? []}
          />
        )}
        <div className="relative">
          <div className="space-y-4 divide-y-2 divide-dashed">
            {chartDataStatus !== 'success' || !isRender ? (
              <ChartLoading />
            ) : (
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
                    lineChartData={source?.lineData ?? []}
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
                      histogramChartData={source?.buzzData ?? []}
                      histogramSeriesOptions={getSymbolHistogramSeriesOptions()}
                    />
                  </LightWeightChart>
                </div>
              </>
            )}
          </div>
          <ChartResampleGroup symbol={symbol.symbol} />
          {/* 심볼뉴스 */}
          <section className="mb-11 mt-5">
            <h3 className="mb-4 font-bold text-black">관련 뉴스</h3>
            {!isRender ? (
              <NewsListLoading length={3} />
            ) : (
              <NewsList newsList={symbolShortNews?.data.data?.news ?? []} />
            )}
            <Link
              href={`/chart/symbol/news/${symbol.symbol.toUpperCase()}`}
              className="mt-5 flex items-center justify-center"
            >
              <button className="box-border flex h-10 w-[311px] items-center justify-center rounded-3xl border-2 border-[#E2E6ED] px-4 py-3">
                <p className="font-bold">뉴스 전체보기</p>
                <BsArrowRightShort className="ml-[18px] shrink-0 text-2xl" />
              </button>
            </Link>
          </section>
        </div>
      </section>
      <LockNotification
        active={subscribeNotification.active}
        dimHeight={subscribeNotification.dimHeight}
        title={LockNotificationTemplate[subscribeNotification.type].title}
        content={LockNotificationTemplate[subscribeNotification.type].content}
        buttonText={LockNotificationTemplate[subscribeNotification.type].buttonText}
        linkURL={LockNotificationTemplate[subscribeNotification.type].linkURL}
        onClose={() => {
          setSubscribeNotification((prev) => ({ ...prev, active: false }));
        }}
      />
      <TimeoutNotification
        active={timeoutNotification.active}
        dimHeight={timeoutNotification.dimHeight}
        title={ServerErrorNotificationTemplate.Timeout.title}
        content={ServerErrorNotificationTemplate.Timeout.content}
        closeOnClick
        onClose={() => {
          setTimeoutNotification((prev) => ({ ...prev, active: false }));
        }}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default Chart;
