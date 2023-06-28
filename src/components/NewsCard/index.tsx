import React from 'react';
import { NewsData } from '@/interfaces/NewsData';
import ImageContainer from './ImageContainer';
import NewsContainer from './NewsContainer';
import Select from '../Select';
import Bar from './Bar';
import { getSentimentColor } from '@/util/news';

interface NewsCardProps {
  cardDirection: 'row' | 'column' | 'tile';
  news: NewsData;
}

export default function NewsCard({ news, cardDirection }: NewsCardProps) {
  const sentimentColor = getSentimentColor(news.sentiment);
  return (
    <>
      {cardDirection === 'column' ? (
        <div>
          <ImageContainer cardDirection="column" width={358} height={221} thumbnail="ddd" />
          <NewsContainer cardDirection="column" height={120} margin={14} news={news} />
        </div>
      ) : cardDirection === 'row' ? (
        <div className="row h-[122px] min-w-[357px]">
          <div>
            <Select symbol="">
              <span>logo</span>
              <span>symbol</span>
              <span>companyName</span>
            </Select>
          </div>
          <div>
            <Bar sentiment={news.sentiment} />
            <NewsContainer cardDirection="row" height={72} margin={9} news={news} />
          </div>
        </div>
      ) : (
        <div className="tile h-[106px] w-[106px]" style={{ backgroundColor: `${sentimentColor}` }}>
          <NewsContainer cardDirection="tile" height={106} width={106} news={news} />
        </div>
      )}
    </>
  );
}
