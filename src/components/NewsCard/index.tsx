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
    <div className="m-auto">
      {cardDirection === 'column' ? (
        <div className="flex flex-col">
          <ImageContainer cardDirection="column" width={358} height={221} thumbnail={news.thumbnail} />
          <NewsContainer cardDirection="column" height={120} margin={14} news={news} />
        </div>
      ) : cardDirection === 'row' ? (
        <div className="flex h-[122px] min-w-[357px] flex-col">
          <Select symbol="dd">
            <div
              className="h-[19px] w-[19px] rounded-[50%] bg-cover"
              style={{ backgroundImage: `url(${news.logo})` }}
            ></div>
            <span>{news.symbol}</span>
            <span>{news.companyName}</span>
          </Select>
          <div className="flex items-center">
            <Bar sentiment={news.sentiment} />
            <NewsContainer cardDirection="row" height={72} margin={9} news={news} />
          </div>
        </div>
      ) : (
        <div className="tile h-[106px] w-[106px]" style={{ backgroundColor: `${sentimentColor}` }}>
          <NewsContainer cardDirection="tile" height={106} width={106} news={news} />
        </div>
      )}
    </div>
  );
}
