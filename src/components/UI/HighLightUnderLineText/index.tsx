import React, { CSSProperties } from 'react';
import Text from './Text';
import HighLightUnderLine from './HighLightUnderLine';
import { twMerge } from 'tailwind-merge';

interface HighLightUnderLineTextProps {
  underlineColor?: string;
  textColor?: string;
  textSize?: number;
  underlineHeight?: number;
  classes?: {
    wrapper?: string;
    underline?: string;
    text?: string;
  };
  styles?: {
    wrapper?: CSSProperties;
    underline?: CSSProperties;
    text?: CSSProperties;
  };
  bold?: boolean;
  content: string;
}

function HighLightUnderLineText({
  content,
  underlineColor,
  underlineHeight,
  textColor,
  textSize,
  bold,
  classes,
  styles,
}: HighLightUnderLineTextProps) {
  const classNames = twMerge([`relative z-0 inline-block h-fit align-top`, classes?.wrapper]);

  return (
    <div className={classNames} {...(styles?.wrapper && { style: styles.wrapper })}>
      <Text
        textSize={textSize}
        color={textColor}
        bold={bold}
        className={classes?.text}
        style={styles?.text ?? undefined}
      >
        {content}
      </Text>
      <HighLightUnderLine
        underlineHeight={underlineHeight}
        underlineColor={underlineColor}
        className={classes?.underline}
        style={styles?.underline ?? undefined}
      />
    </div>
  );
}

export default HighLightUnderLineText;
