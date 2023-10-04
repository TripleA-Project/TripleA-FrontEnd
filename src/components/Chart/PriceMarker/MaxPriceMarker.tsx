import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PriceMarkerPoint from './PriceMarkerPoint';
import type { Marker, PriceMarkerControl } from './PriceMarkerContainer';

interface MaxPriceMarkerProps {
  visible?: boolean;
}

interface StyledMaxPriceMarkerProps {
  coord: Marker['coord'];
  isOverflow: boolean;
}

const StyledMaxPriceMarker = styled.div<StyledMaxPriceMarkerProps>`
  ${({ coord, isOverflow }) => {
    return css`
      top: ${coord.price - 4}px;
      left: ${isOverflow ? `${coord.time}` : `${coord.time - 2.2}`}px;
      ${isOverflow
        ? css`
            transform: translate(calc(-100% + 3.5px), calc(-100%));
            flex-direction: row-reverse;
          `
        : css`
            transform: translate(0px, calc(-100%));
            flex-direction: row;
          `};
    `;
  }}
`;

function MaxPriceMarker({ visible = false }: MaxPriceMarkerProps, ref: ForwardedRef<PriceMarkerControl>) {
  const [show, setShow] = useState(visible);
  const [coord, setCoord] = useState<Marker['coord']>({ time: 0, price: 0 });
  const [content, setContent] = useState('');

  const [isOverflow, setIsOverflow] = useState(false);

  const maxPriceMarkerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    element: maxPriceMarkerRef.current,
    render() {
      setShow(true);
    },
    unmount() {
      setShow(false);
    },
    setPosition({ time: timeCoord, price: priceCoord }) {
      setCoord((prev) => ({ ...prev, time: timeCoord, price: priceCoord }));
    },
    display(payload) {
      setContent(`최고 ${Intl.NumberFormat('ko').format((payload as any).toFixed(2))} USD`);
    },
  }));

  useLayoutEffect(() => {
    if (!maxPriceMarkerRef.current) return;

    if (!coord.time || !coord.price) {
      setShow(false);

      return;
    }

    if (coord.time < 0 || coord.price < 0) {
      setShow(false);

      return;
    }

    if (coord.time > maxPriceMarkerRef.current.parentElement!.clientWidth) {
      setShow(false);

      return;
    }

    const overflow =
      coord.time - 2.2 + maxPriceMarkerRef.current.clientWidth > maxPriceMarkerRef.current.parentElement!.clientWidth;

    setIsOverflow(overflow);
  }, [coord]);

  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  return show ? (
    <StyledMaxPriceMarker
      ref={maxPriceMarkerRef}
      coord={coord}
      isOverflow={isOverflow}
      className="pointer-events-none absolute flex w-max items-center gap-2"
    >
      <PriceMarkerPoint className="shrink-0" />
      <span className="shrink-0 text-xs font-medium text-[#E91B1B]">{content}</span>
    </StyledMaxPriceMarker>
  ) : null;
}

export default forwardRef(MaxPriceMarker);
