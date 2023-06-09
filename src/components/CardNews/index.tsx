'use client';
import React, { ReactNode } from 'react';
import NewsImage from './NewsImage';
import ChipContainer from '@/components/CardNews2/ChipContainer';
import News from '@/components/CardNews2/News';
import ButtonContainer from './ButtonContainer';

import { NewsData } from '@/interfaces/NewsData';

import styled from '@emotion/styled';

interface CardNewsProps extends NewsData {
  cardDirection: string;
  description: string;
}

interface CardProps {
  cardDirection: string; //column, row, tile
  sentimentColor: string;
  children: ReactNode;
}

const Card = styled.li<CardProps>`
  overflow: hidden;
  box-sizing: border-box;
  max-width: ${({ cardDirection }) => (cardDirection === 'tile' ? '106px' : '770px')};
  min-width: ${({ cardDirection }) =>
    cardDirection === `column` ? `358px` : cardDirection === `row` ? `357px` : `106px`};
  margin: 10px 0;
  padding: ${({ cardDirection }) => cardDirection === `tile` && `12px`};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* width: ${({ cardDirection }) =>
    cardDirection === `column` ? `358px` : cardDirection === `row` ? `357px` : `106px`}; */
  min-height: ${({ cardDirection }) =>
    cardDirection === `column` ? `344px` : cardDirection === `row` ? `122px` : `auto`};
  height: ${({ cardDirection }) => cardDirection === `tile` && `106px`};
  background-color: ${({ cardDirection, sentimentColor }) => (cardDirection === `tile` ? `${sentimentColor}` : `#fff`)};
  .title {
    max-height: ${({ cardDirection }) => cardDirection === `tile` && `40px`};
    font-size: ${({ cardDirection }) => cardDirection === `tile` && `14px`};
    font-weight: ${({ cardDirection }) => cardDirection === `tile` && `600`};
  }
`;

function CardNews({
  newsId,
  symbol,
  logo,
  source,
  title,
  thumbnail,
  publishedDate,
  sentiment,
  bookmark,
  cardDirection,
}: CardNewsProps) {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= -10 && sentiment < 0.5) {
      return '#786BE4';
    } else if (sentiment >= 0.5 && sentiment < 1.5) {
      return '#759DEB';
    } else if (sentiment >= 1.5 && sentiment < 3.5) {
      return '#91DF75';
    } else if (sentiment >= 3.5 && sentiment < 4.5) {
      return '#F6DD52';
    } else if (sentiment >= 4.5 && sentiment < 10) {
      return '#FD954A';
    }
    return '#000';
  };
  const sentimentColor = getSentimentColor(sentiment);

  return (
    <>
      <Card className="rounded-2xl bg-white" cardDirection={cardDirection} sentimentColor={sentimentColor}>
        {cardDirection === 'column' ? (
          <div className="column">
            <div>
              <NewsImage thumbnail={thumbnail} cardDirection={cardDirection} />
            </div>
            <div style={{ padding: '10px' }}>
              <ChipContainer symbol={symbol} logo={logo} />
              <News
                title={title}
                source={source}
                publishedDate={publishedDate}
                sentimentColor={sentimentColor}
                hole1={''}
                hole2={''}
                cardDirection={cardDirection}
              />
              <ButtonContainer newsId={newsId} bookmark={bookmark} />
            </div>
          </div>
        ) : cardDirection === 'row' ? (
          <div className="row">
            <ChipContainer symbol={symbol} logo={logo} />
            <News
              title={title}
              source={source}
              publishedDate={publishedDate}
              sentimentColor={sentimentColor}
              hole1={<NewsImage thumbnail={thumbnail} cardDirection={cardDirection} />}
              hole2={<ButtonContainer bookmark={bookmark} newsId={newsId} />}
              cardDirection={cardDirection}
            />
          </div>
        ) : (
          <>
            <div className="title  overflow-hidden text-ellipsis ">{title}</div>
            <div className="time text-right text-[10px] font-semibold text-white">{publishedDate}</div>
          </>
        )}
      </Card>
      {cardDirection === 'row' && <div className="divider h-[1.5px] w-[100%] bg-[#eee]"></div>}
    </>
  );
}

export default CardNews;
