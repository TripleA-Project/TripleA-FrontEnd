'use client';

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { twMerge } from 'tailwind-merge';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  textSize?: number;
  bold?: boolean;
}

interface StyledTextProps extends TextProps {}

const StyledText = styled.span<StyledTextProps>`
  ${({ textSize, className }) => {
    const hasTextClass = className ? className.includes('text-') : false;

    if (!textSize && hasTextClass) return css``;

    return textSize
      ? css`
          font-size: ${textSize}px;
        `
      : css`
          font-size: inherit;
        `;
  }}
`;

function Text({ textSize, bold, className, ...props }: TextProps) {
  const classNames = twMerge([`relative z-[2]`, bold && 'font-bold', className]);

  return <StyledText textSize={textSize} className={classNames} {...props} />;
}

export default Text;
