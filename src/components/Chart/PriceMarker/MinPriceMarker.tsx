import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PriceMarkerPoint from './PriceMarkerPoint';
import type { Marker, PriceMarkerControl } from './PriceMarkerContainer';

interface MinPriceMarkerProps {
  visible?: boolean;
}

interface StyledMinPriceMarkerProps {
  coord: Marker['coord'];
  isOverflow: boolean;
}

const StyledMinPriceMarker = styled.div<StyledMinPriceMarkerProps>`
  ${({ coord, isOverflow }) => {
    return css`
      top: ${coord.price + 4}px;
      left: ${isOverflow ? `${coord.time}` : `${coord.time - 2.2}`}px;
      ${isOverflow
        ? css`
            transform: translateX(calc(-100% + 3.5px));
            flex-direction: row-reverse;
          `
        : css`
            transform: translateX(0px);
            flex-direction: row;
          `};
    `;
  }}
`;

function MinPriceMarker({ visible = false }: MinPriceMarkerProps, ref: ForwardedRef<PriceMarkerControl>) {
  const [show, setShow] = useState(visible);
  const [coord, setCoord] = useState<Marker['coord']>({ time: 0, price: 0 });
  const [content, setContent] = useState('');

  const [isOverflow, setIsOverflow] = useState(false);

  const minPriceMarkerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    element: minPriceMarkerRef.current,
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
      setContent(`최저 ${Intl.NumberFormat('ko').format((payload as any).toFixed(2))} USD`);
    },
  }));

  useLayoutEffect(() => {
    if (!minPriceMarkerRef.current) return;

    if (!coord.time || !coord.price) {
      setShow(false);

      return;
    }

    if (coord.time < 0 || coord.price < 0) {
      setShow(false);

      return;
    }

    if (coord.time > minPriceMarkerRef.current.parentElement!.clientWidth) {
      setShow(false);

      return;
    }

    const overflow =
      coord.time - 2.2 + minPriceMarkerRef.current.clientWidth > minPriceMarkerRef.current.parentElement!.clientWidth;

    setIsOverflow(overflow);
  }, [coord]);

  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  return show ? (
    <StyledMinPriceMarker
      ref={minPriceMarkerRef}
      coord={coord}
      isOverflow={isOverflow}
      className="pointer-events-none absolute flex w-max items-center gap-2"
    >
      <PriceMarkerPoint className="shrink-0" />
      <span className="shrink-0 text-xs font-medium text-[#E91B1B]">{content}</span>
    </StyledMinPriceMarker>
  ) : null;
}

export default forwardRef(MinPriceMarker);
