import { NewsData } from '@/interfaces/NewsData';

import { ReactNode } from 'react';
import Bar from './Bar';

import styled from '@emotion/styled';

interface NewsContainerProps {
  cardDirection: string;
}

interface ContainerProps {
  cardDirection: string;
  children: ReactNode;
}

interface NewsProps extends Pick<NewsData, 'title' | 'source' | 'publishedDate'> {
  hole1?: ReactNode;
  hole2?: ReactNode;
  sentimentColor: string;
  cardDirection: string;
}
interface HoleProps {
  cardDirection: string;
  children: ReactNode;
}

const NewsContainer = styled.div<NewsContainerProps>`
  .subText {
    position: absolute;
    bottom: ${({ cardDirection }) => (cardDirection === 'column' ? '-50px' : '0px')};
    span {
      font-size: 14px;
      padding-right: 5px;
    }
  }
`;
const Container = styled.div<ContainerProps>`
  display: ${({ cardDirection }) => (cardDirection === 'row' ? 'grid' : cardDirection === 'column' ? 'block' : 'flex')};
  grid-template-columns: ${({ cardDirection }) => cardDirection === 'row' && '1fr 8fr 2fr'};
`;

const Hole1 = styled.div<HoleProps>`
  width: ${({ cardDirection }) => (cardDirection === 'row' ? '66px' : '100%')};
  height: ${({ cardDirection }) => (cardDirection === 'row' ? '66px' : '170px')};
  background-color: red;
`;
const Hole2 = styled.div<HoleProps>``;

export default function News({ title, source, publishedDate, sentimentColor, hole1, hole2, cardDirection }: NewsProps) {
  return (
    <NewsContainer className="flex w-full " cardDirection={cardDirection}>
      <Bar sentimentColor={sentimentColor} />
      <Container className="justify-evenly" cardDirection={cardDirection}>
        {hole1 && (
          <Hole1 className="overflow-hidden" cardDirection={cardDirection}>
            {hole1}
          </Hole1>
        )}
        <h3 className="relative ml-[10px] flex max-h-[66px] min-h-[40px] flex-col text-[14px] font-semibold">
          {title}
          <div className="subText">
            <span className="text-[#777777 text-[10px] font-semibold">[{source}]</span>
            <span className="text-[#777777 text-[10px] font-semibold">{publishedDate}</span>
          </div>
        </h3>
        {hole2 && (
          <Hole2 className="flex items-center justify-end overflow-hidden" cardDirection={cardDirection}>
            {hole2}
          </Hole2>
        )}
      </Container>
    </NewsContainer>
  );
}
