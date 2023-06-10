'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min: number;
  max: number;
}

const StyeldProgress = styled.div<ProgressProps>`
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ value }) =>
      css`
        ${value}%
      `};
    transition: width 0.3s;
  }
`;

function Progress({ value, min, max, className, ...props }: ProgressProps) {
  const normalize = (value: number, { min, max }: { min: number; max: number }) => {
    return ((value - min) * 100) / (max - min);
  };

  return (
    <StyeldProgress
      className={`relative h-2 w-full rounded-lg bg-[#D5DDE9] before:h-full before:rounded-lg before:bg-[#5645F6] ${className}`}
      value={normalize(value, { min, max })}
      min={min}
      max={max}
      {...props}
    />
  );
}

export default Progress;
