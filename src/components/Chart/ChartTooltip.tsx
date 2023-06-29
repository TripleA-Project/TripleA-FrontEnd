'use client';

import { forwardRef, useRef, useState, type RefObject, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { type Coordinate, type HistogramData, type IChartApi, type LineData, type Time } from 'lightweight-charts';
import { type SentimentData } from '@/service/chart';
import dayjs from 'dayjs';
import { css } from '@emotion/react';

interface ChartTooltipPortalProps {
  controlRef: RefObject<ChartTooltipControl>;
  container: HTMLDivElement | null;
  chartApi: IChartApi | null;
  source?: ChartTooltipSource;
  width?: number;
  height?: number;
  visible?: boolean;
}

interface ChartTooltipProps {
  chartApi?: IChartApi | null;
  container?: HTMLDivElement | null;
  source?: ChartTooltipSource;
  positionLeft?: number;
  width?: number;
  height?: number;
}

export interface ChartTooltipSource {
  lineData?: LineData[];
  buzzData?: HistogramData[];
  sentimentData?: SentimentData[];
}

export interface ChartTooltipPayload {
  time: Time;
  lineData: LineData;
  buzzData: HistogramData;
  sentimentData: SentimentData;
}

export interface ChartTooltipControl {
  element: HTMLDivElement | null;
  render: () => void;
  unmount: () => void;
  setPosition: (coord?: Coordinate | null) => void;
  display: (payload: any) => void;
}

const StyledChartTooltip = styled.div<{ width?: number; coord: number; container?: HTMLDivElement | null }>`
  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
        `
      : css`
          width: auto;
        `};
  ${({ coord, container }) => {
    if (coord < 64)
      return css`
        left: 64px;
      `;
    if (container && coord > container.clientWidth - 64) {
      return css`
        left: ${container.clientWidth - 64}px;
      `;
    }

    return css`
      left: ${coord}px;
    `;
  }}
  transform: translateX(-50%);
`;

const StyledChartTooltipSentiment = styled.p<{ textColor: string }>`
  ${({ textColor }) =>
    css`
      & span {
        color: ${textColor};
      }
    `}
`;

const ChartTooltip = forwardRef<ChartTooltipControl, ChartTooltipProps>(
  ({ container, chartApi, source, width }, ref) => {
    const chartTooltipRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(true);
    const [coord, setCoord] = useState(0);
    const [content, setContent] = useState({
      date: '',
      stockPrice: 0,
      buzz: 0,
      sentiment: {
        value: '',
        color: '#000',
      },
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          element: chartTooltipRef.current,
          render() {
            setShow(true);
          },
          unmount() {
            setShow(false);
          },
          setPosition(coord) {
            setCoord(coord ?? 0);
          },
          display(time: Time) {
            const targetTime = dayjs(time as string);
            const parsedTime = {
              day: targetTime.format('D'),
              month: targetTime.format('M'),
              year: targetTime.format('YYYY'),
            };

            const targetIdx =
              source?.lineData?.findIndex((data) => {
                const { day, month, year } = data.time as { day: number; month: number; year: number };

                return (
                  day === Number(parsedTime.day) &&
                  month === Number(parsedTime.month) &&
                  year === Number(parsedTime.year)
                );
              }) ?? -1;

            if (!source || targetIdx <= -1) {
              setContent((prev) => ({ ...prev, date: time as string }));
              return;
            }

            const payload = {
              stockPrice: source.lineData![targetIdx].value,
              buzz: source.buzzData![targetIdx].value,
              sentiment: {
                value: source.sentimentData![targetIdx].value,
                color: source.sentimentData![targetIdx].color,
              },
            };

            setContent((prev) => ({ ...prev, ...payload, date: time as string }));
          },
        };
      },
      [ref, chartApi] /* eslint-disable-line */,
    );

    return show ? (
      <StyledChartTooltip
        ref={chartTooltipRef}
        width={width}
        coord={coord}
        container={container}
        className="pointer-events-none absolute -top-16 z-10 box-border rounded-lg bg-black/70 px-4 py-2.5 text-sm text-white"
      >
        <p>{content.date}</p>
        <p>종가 {content.stockPrice} USD</p>
        <p>버즈량 {content.buzz}</p>
        <StyledChartTooltipSentiment textColor={content.sentiment.color}>
          감성지수 <span>{content.sentiment.value}</span>
        </StyledChartTooltipSentiment>
      </StyledChartTooltip>
    ) : null;
  },
);

ChartTooltip.displayName = 'ChartTooltip';

function ChartTooltipPortal({
  container,
  chartApi,
  source,
  width,
  height,
  controlRef,
  visible,
}: ChartTooltipPortalProps) {
  return container && visible
    ? createPortal(
        <ChartTooltip
          ref={controlRef}
          container={container}
          chartApi={chartApi}
          source={source}
          width={width}
          height={height}
        />,
        container,
      )
    : null;
}

export default ChartTooltipPortal;
