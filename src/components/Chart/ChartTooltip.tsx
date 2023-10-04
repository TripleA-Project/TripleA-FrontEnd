'use client';

import { forwardRef, useRef, useState, type RefObject, useImperativeHandle, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useChartSource } from '@/redux/slice/chartSourceSlice';
import { ChartContext } from '@/context/ChartContext';
import { ChartTooltipCloseEvent } from './constants/event';
import { Kor_Days } from '@/constants/calendar';
import type { Coordinate, HistogramData, IChartApi, LineData, Time } from 'lightweight-charts';
import type { SentimentData } from '@/service/chart';

interface ChartTooltipPortalProps {
  controlRef: RefObject<ChartTooltipControl>;
  chartApi: IChartApi | null;
  tooltipWidth?: number;
  height?: number;
}

interface ChartTooltipProps {
  chartApi?: IChartApi | null;
  container?: HTMLDivElement | null;
  positionLeft?: number;
  tooltipWidth?: number;
  height?: number;
  visible?: boolean;
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

const StyledChartTooltip = styled.div<{ tooltipWidth?: number; coord: number; container?: HTMLDivElement | null }>`
  ${({ tooltipWidth }) =>
    tooltipWidth
      ? css`
          width: ${tooltipWidth}px;
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
      & .sentiment {
        color: ${textColor};
      }
    `}
`;

const ChartTooltip = forwardRef<ChartTooltipControl, ChartTooltipProps>(
  ({ container, chartApi, tooltipWidth, visible = false }, ref) => {
    const chartTooltipRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(visible);
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

    const { source: chartSource } = useChartSource();

    useEffect(() => {
      return () => {
        setShow(false);
      };
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          element: chartTooltipRef.current,
          render() {
            if (container?.parentElement) {
              container.parentElement.style.removeProperty('cursor');
            }
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

            const targetIdx =
              chartSource?.lineData?.findIndex((data) => {
                return targetTime.format('YYYY-MM-DD') === dayjs(data.time as string).format('YYYY-MM-DD');
              }) ?? -1;

            if (!chartSource || targetIdx <= -1) {
              setContent((prev) => ({ ...prev, date: time as string }));
              return;
            }

            const payload = {
              stockPrice: chartSource.lineData![targetIdx].value,
              buzz: chartSource.buzzData![targetIdx].value,
              sentiment: {
                value: chartSource.sentimentData![targetIdx].value,
                color: chartSource.sentimentData![targetIdx].color,
              },
            };

            setContent((prev) => ({ ...prev, ...payload, date: time as string }));
          },
        };
      },
      [ref, chartApi, chartSource] /* eslint-disable-line */,
    );

    return show ? (
      <StyledChartTooltip
        ref={chartTooltipRef}
        tooltipWidth={tooltipWidth}
        coord={coord}
        container={container}
        className="absolute -top-16 z-[9] box-border space-y-2 rounded-lg bg-black/70 px-4 py-2.5 text-sm font-normal text-white mobile:!w-[150px] tablet:!w-[150px]"
      >
        <div className="absolute left-0 top-0 flex w-full">
          <button
            className="absolute right-4 top-4 mobile:!right-2 mobile:!top-2 tablet:!right-2 tablet:!top-2"
            onClick={(e) => window.dispatchEvent(ChartTooltipCloseEvent)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M1 1L13 13" stroke="white" stroke-width="1.03919" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex w-full items-center gap-1">
          <p>{content.date.replaceAll('-', '.')}</p>
          <p>({Kor_Days[dayjs(content.date).get('d')]})</p>
        </div>
        <div className="flex w-full items-center gap-1">
          <p>종가</p>
          <p>{content.stockPrice} USD</p>
        </div>
        <div className="flex w-full items-center gap-1">
          <p>버즈량</p>
          <p>{content.buzz}</p>
        </div>
        <StyledChartTooltipSentiment textColor={content.sentiment.color} className="flex w-full items-center gap-1">
          <p>감성지수</p>
          <p className="sentiment">{content.sentiment.value}</p>
        </StyledChartTooltipSentiment>
      </StyledChartTooltip>
    ) : null;
  },
);

ChartTooltip.displayName = 'ChartTooltip';

function ChartTooltipPortal({ chartApi, tooltipWidth, height, controlRef }: ChartTooltipPortalProps) {
  const { container, tooltipVisible } = useContext(ChartContext);

  return container && tooltipVisible
    ? createPortal(
        <ChartTooltip
          ref={controlRef}
          container={container}
          chartApi={chartApi}
          tooltipWidth={tooltipWidth}
          height={height}
        />,
        container,
      )
    : null;
}

export default ChartTooltipPortal;
