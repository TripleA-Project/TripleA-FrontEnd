'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';

interface SpeechBallonProps extends React.HTMLAttributes<HTMLDivElement> {
  ballonBorderColor?: string;
  tailBorderWidth?: number;
  tailBorderColor?: string;
  tailBackgroundColor?: string;
}

type StyledSpeechBalloonTailProps = Omit<SpeechBallonProps, keyof React.HTMLAttributes<HTMLDivElement>>;

function SpeechBalloon({
  ballonBorderColor,
  tailBackgroundColor,
  tailBorderColor,
  tailBorderWidth,
  className,
  style,
  children,
  ...props
}: SpeechBallonProps) {
  const classNames = twMerge([
    `relative w-max max-w-full box-border border border-black px-2 py-1 break-all`,
    className,
  ]);

  return (
    <div
      className={classNames}
      style={{
        ...style,
        ...(ballonBorderColor && { borderColor: ballonBorderColor }),
      }}
      {...props}
    >
      {children}
      <StyledSpeechBalloonTail
        tailBorderColor={tailBorderColor}
        tailBackgroundColor={tailBackgroundColor}
        tailBorderWidth={tailBorderWidth}
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
}

export default SpeechBalloon;

const StyledSpeechBalloonTail = styled.div<StyledSpeechBalloonTailProps>`
  &::before,
  &::after {
    position: absolute;
    content: '';
    left: 50%;
    box-sizing: border-box;
    width: 0;
    height: 0;
    transform: translateX(-50%) translateY(100%);
  }

  /* tailBorder */
  &::before {
    bottom: 0;
    ${({ tailBorderColor, tailBorderWidth = 1 }) => css`
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 23px solid ${tailBorderColor || '#000'};
      ${tailBorderWidth > 1
        ? css`
            zoom: ${1 +
            (Number((tailBorderWidth / 10).toFixed(1)) > 1
              ? Number((tailBorderWidth / 10).toFixed(1)) - 1
              : Number((tailBorderWidth / 10).toFixed(1)))};
          `
        : css``}
    `}
    border-bottom: 0px solid transparent;
  }

  /* tailBox */
  &::after {
    bottom: 1px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 22px solid ${({ tailBackgroundColor }) => tailBackgroundColor || '#fff'};
    border-bottom: 0px solid transparent;
  }
`;
