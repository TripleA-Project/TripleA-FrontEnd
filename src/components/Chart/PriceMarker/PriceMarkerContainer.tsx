'use client';

import React, { useContext } from 'react';
import { ChartContext, type Coord } from '@/context/ChartContext';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface PriceMarkerContainerProps {
  children: React.ReactNode;
}

interface StyledPriceMarkerContainerProps {
  priceWidth: number;
}

export type Marker = {
  coord: { time: number; price: number };
  value: number;
};

export interface PriceMarkerControl {
  element: HTMLDivElement | null;
  render: () => void;
  unmount: () => void;
  setPosition: (coord: Coord) => void;
  display: (payload: Marker['value']) => void;
}

const StyledPriceMarkerContainer = styled.div<StyledPriceMarkerContainerProps>`
  ${({ priceWidth }) => css`
    width: calc(100% - ${priceWidth}px);
  `}
`;

function PriceMarkerContainer({ children }: PriceMarkerContainerProps) {
  const { markerVisible } = useContext(ChartContext);

  return markerVisible ? (
    <StyledPriceMarkerContainer className="pointer-events-none absolute left-0 top-0 z-[2] h-full" priceWidth={40}>
      {children}
    </StyledPriceMarkerContainer>
  ) : null;
}

export default PriceMarkerContainer;
