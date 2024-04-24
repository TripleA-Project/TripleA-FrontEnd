'use client';

import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';

interface GradientBoxProps {
  className?: string;
  positionBottom?: number | string;
  boxHeight?: number | string;
}

function GradientBox({ positionBottom = 0, boxHeight = 16, className }: GradientBoxProps) {
  const classNames = twMerge([`absolute left-0 w-full translate-y-full`, className]);

  return <StyledGradientBox className={classNames} positionBottom={positionBottom} boxHeight={boxHeight} />;
}

export default GradientBox;

const StyledGradientBox = styled.div<GradientBoxProps>`
  height: ${({ boxHeight }) => (typeof boxHeight === 'number' ? boxHeight + 'px' : boxHeight)};
  bottom: ${({ positionBottom }) => (typeof positionBottom === 'number' ? positionBottom + 'px' : positionBottom)};
  background-image: linear-gradient(to top, transparent, #fff 60%);
`;
