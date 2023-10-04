'use client';

import { useRef, useLayoutEffect, useContext } from 'react';
import dayjs from 'dayjs';
import { isMobile } from 'react-device-detect';
import { ChartContext } from '@/context/ChartContext';
import { useChartSource } from '@/redux/slice/chartSourceSlice';
import ChartTimeMarker, { type TimeMarkerControl } from '../ChartTimeMarker';
import { ChartTooltip } from '..';
import PriceMarkerContainer, { type PriceMarkerControl } from '../PriceMarker/PriceMarkerContainer';
import MaxPriceMarker from '../PriceMarker/MaxPriceMarker';
import MinPriceMarker from '../PriceMarker/MinPriceMarker';
import { getDataMinMax } from '@/util/chart';
import { chartAreaMouseLeaveEventName, chartTooltipCloseEventName } from '../constants/event';
import type { IChartApi, MouseEventParams, LogicalRange, ISeriesApi, LineData } from 'lightweight-charts';
import type { ChartTooltipControl } from '../ChartTooltip';

type MetaIChartApis = {
  symbolPriceIChartApi: IChartApi | null;
  buzzIChartApi: IChartApi | null;
};

type MetaISeriesApis = {
  symbolPriceLineSeriesApi: ISeriesApi<'Line'> | null;
  buzzHistogramSeriesApi: ISeriesApi<'Histogram'> | null;
};

export interface ChartApiList {
  chartApis: MetaIChartApis;
  seriesApis: MetaISeriesApis;
}

interface ChartContainerProps {
  chartApiList: ChartApiList;
  children: React.ReactNode;
}

function LightWeightChartContainer({ chartApiList, children }: ChartContainerProps) {
  const context = useContext(ChartContext);

  const { source } = useChartSource();

  const isCloseBtnClickRef = useRef(false);
  const prevPointRef = useRef(0);

  const chartTimeMarkerControlRef = useRef<TimeMarkerControl>(null);
  const chartTooltipControlRef = useRef<ChartTooltipControl>(null);

  const maxPriceMarkerControlRef = useRef<PriceMarkerControl>(null);
  const minPriceMarkerControlRef = useRef<PriceMarkerControl>(null);

  function calcMinmax({ currentChartApi, targetChartApi }: { currentChartApi: IChartApi; targetChartApi: IChartApi }) {
    if (currentChartApi === targetChartApi) {
      const minmax =
        context.markerVisible && source?.lineData?.length ? getDataMinMax<LineData>(source.lineData) : null;

      if (minmax) {
        const { min, max } = minmax;

        if (max.target?.time) {
          const maxTimeCoord = Number(
            chartApiList.chartApis.symbolPriceIChartApi?.timeScale().timeToCoordinate(max.target.time)?.toFixed(2),
          );
          const maxPriceCoord = Number(chartApiList.seriesApis.symbolPriceLineSeriesApi?.priceToCoordinate(max.value));

          maxPriceMarkerControlRef.current?.setPosition({
            time: maxTimeCoord,
            price: maxPriceCoord,
          });
          maxPriceMarkerControlRef.current?.display(max.value);

          maxPriceMarkerControlRef.current?.render();
        }

        if (min.target?.time) {
          const minTimeCoord = Number(
            chartApiList.chartApis.symbolPriceIChartApi?.timeScale().timeToCoordinate(min.target.time)?.toFixed(2),
          );
          const minPriceCoord = Number(chartApiList.seriesApis.symbolPriceLineSeriesApi?.priceToCoordinate(min.value));

          minPriceMarkerControlRef.current?.setPosition({
            time: minTimeCoord,
            price: minPriceCoord,
          });
          minPriceMarkerControlRef.current?.display(min.value);

          minPriceMarkerControlRef.current?.render();
        }
      }
    }
  }

  // handlers
  function logicalRangeHandler(this: IChartApi, range: LogicalRange | null, arr: IChartApi[]) {
    const targetCharts = arr.filter((chart) => chart !== this);

    chartTimeMarkerControlRef.current?.unmount();
    chartTooltipControlRef.current?.unmount();

    if (range) {
      targetCharts.forEach((chart) => {
        chart.timeScale().setVisibleLogicalRange(range);
      });

      setTimeout(() => {
        calcMinmax({ currentChartApi: this, targetChartApi: arr[1] });
      }, 100);
    }
  }

  function clickHandler(param: MouseEventParams) {
    if (!param.point?.y || !param.point?.y) {
      chartTimeMarkerControlRef.current?.unmount();
      chartTooltipControlRef.current?.unmount();

      return;
    }

    if (param.time) {
      // line(주가) 차트의 timeScale 적용
      const timeCoord = chartApiList.chartApis.symbolPriceIChartApi!.timeScale().timeToCoordinate(param.time);

      chartTimeMarkerControlRef.current?.display(param.time);
      chartTooltipControlRef.current?.display(param.time);

      const targetPrice = source?.lineData.find(
        (lineSource) =>
          dayjs(lineSource.time as string).format('YYYY-MM-DD') === dayjs(param.time as string).format('YYYY-MM-DD'),
      )?.value;
      const priceCoord = targetPrice
        ? chartApiList.seriesApis.symbolPriceLineSeriesApi!.priceToCoordinate(targetPrice)
        : -1;

      chartTimeMarkerControlRef.current?.setPosition({ time: timeCoord, price: priceCoord as any });
      chartTimeMarkerControlRef.current?.render();

      chartTooltipControlRef.current?.setPosition(timeCoord);
      chartTooltipControlRef.current?.render();
    }
  }

  function crossHairMoveHandler(param: MouseEventParams) {
    if (isCloseBtnClickRef.current === true) {
      chartTimeMarkerControlRef.current?.unmount();
      chartTooltipControlRef.current?.unmount();

      if (context.container?.parentElement) {
        context.container.parentElement.style.cursor = 'default';
      }

      if ((param.point?.x ?? 0) - prevPointRef.current !== 0) {
        isCloseBtnClickRef.current = false;
      }

      return;
    }

    if (param.time) {
      // line(주가) 차트의 timeScale 적용
      const timeCoord = chartApiList.chartApis.symbolPriceIChartApi!.timeScale().timeToCoordinate(param.time);

      chartTimeMarkerControlRef.current?.display(param.time);
      chartTooltipControlRef.current?.display(param.time);

      const targetPrice = source?.lineData.find(
        (lineSource) =>
          dayjs(lineSource.time as string).format('YYYY-MM-DD') === dayjs(param.time as string).format('YYYY-MM-DD'),
      )?.value;
      const priceCoord = targetPrice
        ? chartApiList.seriesApis.symbolPriceLineSeriesApi!.priceToCoordinate(targetPrice)
        : -1;

      if (timeCoord !== null && context.container) {
        if (timeCoord < 0 || timeCoord > context.container.clientWidth - 40) {
          chartTimeMarkerControlRef.current?.unmount();
          chartTooltipControlRef.current?.unmount();

          return;
        }
      }

      chartTimeMarkerControlRef.current?.setPosition({ time: timeCoord, price: priceCoord as any });
      chartTimeMarkerControlRef.current?.render();

      chartTooltipControlRef.current?.setPosition(timeCoord);
      chartTooltipControlRef.current?.render();

      prevPointRef.current = param.point?.x ?? 0;
    }
  }

  useLayoutEffect(() => {
    const leaveHandler = (e: CustomEvent) => {
      chartTimeMarkerControlRef.current?.unmount();
      chartTooltipControlRef.current?.unmount();
    };

    const closeHandler = (e: CustomEvent) => {
      isCloseBtnClickRef.current = true;

      chartTimeMarkerControlRef.current?.unmount();
      chartTooltipControlRef.current?.unmount();
    };

    const dimHandler = (e: MouseEvent) => {
      const closest = (e.target as HTMLElement).closest('#symbol-chart');

      if (!closest) {
        chartTimeMarkerControlRef.current?.unmount();
        chartTooltipControlRef.current?.unmount();
      }
    };

    window.addEventListener(chartAreaMouseLeaveEventName as any, leaveHandler);
    window.addEventListener(chartTooltipCloseEventName as any, closeHandler);

    window.addEventListener('click', dimHandler);

    return () => {
      if (chartTimeMarkerControlRef) {
        chartTimeMarkerControlRef!.current?.unmount();
      }

      if (chartTooltipControlRef) {
        chartTooltipControlRef!.current?.unmount();
      }

      window.removeEventListener(chartAreaMouseLeaveEventName as any, leaveHandler);
      window.removeEventListener(chartTooltipCloseEventName as any, closeHandler);

      window.removeEventListener('click', dimHandler);
    };
  }, []);

  useLayoutEffect(() => {
    const charts = [chartApiList.chartApis.symbolPriceIChartApi, chartApiList.chartApis.buzzIChartApi];

    const logicalRangeHandlers = {
      symbolPriceIChart: (range: LogicalRange | null) =>
        logicalRangeHandler.call(charts[0]!, range, charts as IChartApi[]),
      buzzIChart: (range: LogicalRange | null) => logicalRangeHandler.call(charts[1]!, range, charts as IChartApi[]),
    };

    if (chartApiList.chartApis.symbolPriceIChartApi && chartApiList.chartApis.buzzIChartApi) {
      charts.forEach((chart, idx) => {
        isMobile ? chart?.subscribeClick(clickHandler) : chart?.subscribeCrosshairMove(crossHairMoveHandler);

        if (idx === 0) {
          chart?.timeScale().subscribeVisibleLogicalRangeChange(logicalRangeHandlers.symbolPriceIChart);
        }

        if (idx === 1) {
          chart?.timeScale().subscribeVisibleLogicalRangeChange(logicalRangeHandlers.buzzIChart);
        }
      });
    }

    return () => {
      chartApiList.chartApis.symbolPriceIChartApi?.unsubscribeCrosshairMove(crossHairMoveHandler);
      chartApiList.chartApis.buzzIChartApi?.unsubscribeCrosshairMove(crossHairMoveHandler);

      chartApiList.chartApis.symbolPriceIChartApi?.unsubscribeClick(clickHandler);
      chartApiList.chartApis.buzzIChartApi?.unsubscribeClick(clickHandler);

      chartApiList.chartApis.symbolPriceIChartApi
        ?.timeScale()
        .unsubscribeVisibleLogicalRangeChange(logicalRangeHandlers.symbolPriceIChart);
      chartApiList.chartApis.buzzIChartApi
        ?.timeScale()
        .unsubscribeVisibleLogicalRangeChange(logicalRangeHandlers.buzzIChart);
    };
  }, [chartApiList, source]); /* eslint-disable-line */

  return (
    <>
      {children}
      <ChartTimeMarker controlRef={chartTimeMarkerControlRef} crossHairHorizonVisible={false} />
      <ChartTooltip
        controlRef={chartTooltipControlRef}
        chartApi={context.api}
        tooltipWidth={209}
        height={context.api?.options().height}
      />
      <PriceMarkerContainer>
        <MaxPriceMarker ref={maxPriceMarkerControlRef} />
        <MinPriceMarker ref={minPriceMarkerControlRef} />
      </PriceMarkerContainer>
    </>
  );
}

export default LightWeightChartContainer;
