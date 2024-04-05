'use client';

import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';

interface VerticalLineProps extends React.HTMLAttributes<HTMLDivElement> {
  lineColor?: string;
}

function VerticalLine({ className, ...props }: VerticalLineProps) {
  const classNames = twMerge([
    `relative shrink-0 w-[1px] h-full bg-transparent box-border after:content-[''] after:absolute after:w-full after:h-full after:bg-[#eee] after:h-[calc(100%-4px)] after:top-0 after:bottom-0 after:my-auto`,
    className,
  ]);

  return <StyledVerticalLine className={classNames} {...props} />;
}

export default VerticalLine;

const StyledVerticalLine = styled.div<Pick<VerticalLineProps, 'lineColor'>>`
  ${({ lineColor }) =>
    lineColor
      ? css`
          &::after {
            background-color: ${lineColor};
          }
        `
      : css``}
`;
