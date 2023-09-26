'use client';

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { twMerge } from 'tailwind-merge';

interface HightLightUnderLineProps extends React.HTMLAttributes<HTMLDivElement> {
  underlineColor?: string;
  underlineHeight?: number;
}

interface StyledUnderLineProps extends HightLightUnderLineProps {}

const StyledUnderline = styled.div<StyledUnderLineProps>`
  background-color: ${({ underlineColor }) => underlineColor ?? '#37c720'};
  ${({ underlineHeight }) =>
    underlineHeight
      ? css`
          height: ${underlineHeight}px;
        `
      : css`
          height: 25%;
        `};
`;

function HighLightUnderLine({ underlineColor, underlineHeight, className, ...props }: StyledUnderLineProps) {
  const classNames = twMerge([`absolute bottom-[10%] z-[1] max-h-[90%] w-full`, className]);

  return (
    <StyledUnderline
      className={classNames}
      underlineColor={underlineColor}
      underlineHeight={underlineHeight}
      {...props}
    />
  );
}

export default HighLightUnderLine;
