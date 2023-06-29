import React from 'react';
import { NewsData } from '@/interfaces/NewsData';
import CardNews from './index';

interface CardNewsContainerProps {
  newsArr: NewsData[];
  cardDirection: string;
  type: string;
}

export default function CardNewsContainer({ newsArr, cardDirection, type }: CardNewsContainerProps) {
  return (
    <div
      className={
        type === 'hotNews' ? 'm-auto flex flex-wrap justify-center gap-[10px]' : 'm-auto flex flex-wrap gap-[10px]'
      }
    >
      {newsArr.map((news: NewsData) => (
        <CardNews
          cardDirection={cardDirection}
          key={news.newsId}
          newsId={news.newsId}
          symbol={news.symbol}
          source={news.source}
          title={news.title}
          thumbnail={news.thumbnail}
          publishedDate={news.publishedDate}
          sentiment={news.sentiment}
          bookmark={news.bookmark}
          companyName={news.companyName}
          description={news.description}
        />
      ))}
    </div>
  );
}
