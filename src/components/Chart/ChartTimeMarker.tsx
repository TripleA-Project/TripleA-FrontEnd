'use client';

import { forwardRef, useImperativeHandle, useRef, useState, useContext, useEffect, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { usePageTab } from '@/redux/slice/pageTabSlice';
import { ChartContext } from '@/context/ChartContext';
import { getTimeMarker } from '@/util/chart';
import type { Coordinate } from 'lightweight-charts';

interface ChartTimeMarkerPortalProps {
  controlRef: RefObject<TimeMarkerControl>;
  crossHairHorizonVisible?: boolean;
  crossHairVeritcalVisible?: boolean;
}

interface ChartTimeMarkerProps {
  crossHairHorizonVisible?: boolean;
  crossHairVeritcalVisible?: boolean;
  visible?: boolean;
}

interface StyledTimeMarkerProps {
  positionLeft: number;
  timeHeight: number;
}

interface StyledHorizontalLineProps {
  positionTop: number;
  chartWidth: number;
}

interface StyledVerticalLineProps {
  positionLeft: number;
  timeHeight: number;
}

type Coord = Coordinate | null;

export interface TimeMarkerControl {
  element: HTMLDivElement | null;
  render: () => void;
  unmount: () => void;
  setPosition: (coord: { time?: Coord; price?: Coord }) => void;
  display: (payload: any) => void;
}

const StyledChartTimeMarker = styled.div<StyledTimeMarkerProps>`
  ${({ positionLeft, timeHeight }) => css`
    left: ${positionLeft}px;
    ${timeHeight
      ? css`
          height: ${timeHeight}px;
        `
      : css`
          height: 100%;
        `}
  `}
`;

const StyledCrossHairHorizontalLine = styled.svg<StyledHorizontalLineProps>`
  ${({ positionTop, chartWidth }) => {
    return css`
      bottom: calc(100% + 160px + 16px - ${positionTop}px);
      width: ${chartWidth}px;
    `;
  }}
`;

const StyledCrossHairVerticalLine = styled.svg<StyledVerticalLineProps>`
  ${({ positionLeft, timeHeight }) => css`
    left: ${positionLeft}px;
    bottom: ${timeHeight ?? 0}px;
  `}
`;

const ChartTimeMarker = forwardRef<TimeMarkerControl, ChartTimeMarkerProps>(
  ({ crossHairHorizonVisible, crossHairVeritcalVisible, visible = false }, ref) => {
    const markerElementRef = useRef<HTMLDivElement>(null);

    const { api, container, seriesApis } = useContext(ChartContext);
    const { pageTabs } = usePageTab();

    const [positionLeft, setPositionLeft] = useState(0);
    const [positionTop, setPositionTop] = useState(0);
    const [show, setShow] = useState(visible);
    const [content, setContent] = useState('');

    useEffect(() => {
      return () => {
        setShow(false);
      };
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          element: markerElementRef.current,
          render() {
            setShow(true);
          },
          unmount() {
            setShow(false);
          },
          setPosition(coord) {
            if (coord.time) {
              setPositionLeft(Number(coord.time.toFixed(0)));
            }

            if (coord.price) {
              setPositionTop(Number(coord.price.toFixed(2)));
            }
          },
          display(payload) {
            setContent(getTimeMarker(payload, pageTabs.symbolChartPageResampleFrequencyTab));
          },
        };
      },
      [ref, api, seriesApis, pageTabs.symbolChartPageResampleFrequencyTab] /* eslint-disable-line */,
    );

    return show ? (
      <>
        {crossHairHorizonVisible ? (
          <StyledCrossHairHorizontalLine
            className="pointer-events-none absolute left-0 z-[7] h-0.5"
            viewBox={`0 0 ${
              container && !!seriesApis[0] ? container.clientWidth - seriesApis[0].priceScale().width() : 0
            } 2`}
            chartWidth={container && !!seriesApis[0] ? container.clientWidth - seriesApis[0].priceScale().width() : 0}
            positionTop={positionTop}
          >
            <line
              x1="0"
              y1="0"
              x2={container?.clientWidth}
              y2="0"
              strokeWidth={1.7}
              stroke="#9AA1A9"
              strokeDasharray={4}
            />
          </StyledCrossHairHorizontalLine>
        ) : null}
        {crossHairVeritcalVisible ? (
          <StyledCrossHairVerticalLine
            className="pointer-events-none absolute z-[7] h-[320px] w-0.5"
            viewBox="0 0 2 320"
            positionLeft={positionLeft}
            timeHeight={api?.timeScale().height() ?? 0}
          >
            <line x1="0" y1="0" x2="0" y2="322" strokeWidth={1.7} stroke="#FC954A" strokeDasharray={4} />
          </StyledCrossHairVerticalLine>
        ) : null}
        <StyledChartTimeMarker
          ref={markerElementRef}
          className={`pointer-events-none absolute bottom-0 z-[9] w-max -translate-x-1/2 rounded-2xl bg-[#9AA1A9] px-4 py-1 text-[12px] font-bold text-white`}
          positionLeft={positionLeft}
          timeHeight={api?.timeScale().height() ?? 0}
        >
          {content}
        </StyledChartTimeMarker>
      </>
    ) : null;
  },
);

ChartTimeMarker.displayName = 'ChartTimeMarker';

function ChartTimeMarkerPortal({
  controlRef,
  crossHairHorizonVisible = true,
  crossHairVeritcalVisible = true,
}: ChartTimeMarkerPortalProps) {
  const { container, timeMarkerVisible } = useContext(ChartContext);

  return container && timeMarkerVisible
    ? createPortal(
        <ChartTimeMarker
          ref={controlRef}
          crossHairHorizonVisible={crossHairHorizonVisible}
          crossHairVeritcalVisible={crossHairVeritcalVisible}
        />,
        container,
      )
    : null;
}

export default ChartTimeMarkerPortal;
