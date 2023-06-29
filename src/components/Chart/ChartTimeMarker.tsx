'use client';

import { forwardRef, useImperativeHandle, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { type Coordinate, type IChartApi } from 'lightweight-charts';

interface ChartTimeMarkerPortalProps {
  controlRef: RefObject<TimeMarkerControl>;
  container: HTMLDivElement | null;
  chartApi: IChartApi | null;
  visible?: boolean;
  height?: number;
}

interface ChartTimeMarkerProps {
  chartApi?: IChartApi | null;
  positionLeft?: number;
  height?: number;
  visible?: boolean;
}

export interface TimeMarkerControl {
  element: HTMLDivElement | null;
  render: () => void;
  unmount: () => void;
  setPosition: (coord?: Coordinate | null) => void;
  display: (payload: string) => void;
}

const StyledChartTimeMarker = styled.div<ChartTimeMarkerProps>`
  ${({ positionLeft, height }) => css`
    content: '';
    left: ${positionLeft}px;
    height: ${height ? height + 'px' : '100%'};
  `}
`;

const StyledLine = styled.svg<ChartTimeMarkerProps>`
  ${({ positionLeft, height }) => css`
    position: absolute;
    content: '';
    left: ${positionLeft}px;
    transform: translateX(-50%);
    bottom: ${height}px;
    width: 10px;
    height: 322px;
    z-index: 10;
  `}
`;

const ChartTimeMarker = forwardRef<TimeMarkerControl, ChartTimeMarkerProps>(({ chartApi, visible, height }, ref) => {
  const markerElementRef = useRef<HTMLDivElement>(null);
  const [positionLeft, setPositionLeft] = useState(0);
  const [show, setShow] = useState(true);
  const [content, setContent] = useState('');

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
          if (coord) {
            setPositionLeft(Number(coord.toFixed(0)));
            return;
          }
        },
        display(payload) {
          setContent(payload);
        },
      };
    },
    [ref, chartApi] /* eslint-disable-line */,
  );

  return show ? (
    <>
      {visible ? (
        <StyledLine className="pointer-events-none" viewBox="0 0 10 322" positionLeft={positionLeft} height={height}>
          <line x1="5" y1="0" x2="5" y2="322" strokeWidth={0.7} stroke="#FC954A" strokeDasharray={5} />
        </StyledLine>
      ) : null}
      <StyledChartTimeMarker
        ref={markerElementRef}
        className={`absolute bottom-0 z-[10] w-max -translate-x-1/2 rounded-2xl px-4 py-1 text-[12px] font-bold text-white ${
          !visible ? 'bg-transparent' : 'bg-[#9AA1A9]'
        }`}
        positionLeft={positionLeft}
        height={height}
      >
        {content}
      </StyledChartTimeMarker>
    </>
  ) : null;
});

ChartTimeMarker.displayName = 'ChartTimeMarker';

function ChartTimeMarkerPortal({
  container,
  chartApi,
  height,
  controlRef,
  visible = true,
}: ChartTimeMarkerPortalProps) {
  return container && visible
    ? createPortal(
        <ChartTimeMarker ref={controlRef} chartApi={chartApi} height={height} visible={visible} />,
        container,
      )
    : null;
}

export default ChartTimeMarkerPortal;
