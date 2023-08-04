import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getRelativeTime } from '@/util/getRelativeTime';
import { getSentimentGrade } from '@/util/getSentimentGrade';
import { SentimentGrade } from '@/constants/sentimentGrade';
import { type NewsData } from '@/interfaces/NewsData';

interface NewsGridCardProps {
  news: NewsData;
}

interface StyledNewsGridCardProps extends Pick<NewsData, 'sentiment'> {}

export function NewsGridCardLoading() {
  return (
    <article className="box-border rounded-[10px] border border-[#EEEEEE] bg-white p-3">
      <section className="skeleton_loading flex flex-col justify-between gap-5">
        <h3 className="flex w-full flex-col gap-0.5 ![background:none]">
          <p className="h-5" />
          <p className="h-5" />
          <p className="h-5" />
        </h3>
        <p className="h-3 w-8 self-end" />
      </section>
    </article>
  );
}

const StyledNewsGridCard = styled.article<StyledNewsGridCardProps>`
  ${({ sentiment }) => {
    const grade = getSentimentGrade(sentiment);

    const color = SentimentGrade[grade].color;

    return css`
      background-color: ${color};
    `;
  }}
`;

function NewsGridCard({ news }: NewsGridCardProps) {
  return (
    <StyledNewsGridCard sentiment={news.sentiment} className="box-border rounded-[10px] p-3">
      <section className="flex flex-col justify-between gap-5">
        <h3 className="line-clamp-3 text-sm font-semibold text-black">{news.title}</h3>
        <p className="self-end text-[10px] font-semibold text-white">
          {getRelativeTime({ targetDate: news.publishedDate, pivotDate: new Date().toISOString() })}
        </p>
      </section>
    </StyledNewsGridCard>
  );
}

export default NewsGridCard;
