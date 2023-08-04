'use client';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SentimentGrade } from '@/constants/sentimentGrade';
import { getSentimentGrade } from '@/util/getSentimentGrade';

interface SentimentProps {
  sentiment: number;
}

const StyledSentiment = styled.div<SentimentProps>`
  ${({ sentiment }) => {
    const grade = getSentimentGrade(sentiment);

    const color = SentimentGrade[grade].color;

    return css`
      background-color: ${color};
    `;
  }}
`;

export function SentimentLoading() {
  return (
    <div className="skeleton_loading">
      <div className="h-full w-[5px] rounded-[5px]" />
    </div>
  );
}

function Sentiment({ sentiment }: SentimentProps) {
  return <StyledSentiment sentiment={sentiment} className="h-[inherit] w-[5px] shrink-0 rounded-[5px]" />;
}

export default Sentiment;
