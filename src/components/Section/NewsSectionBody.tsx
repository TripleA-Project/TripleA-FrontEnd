'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsCard from '../NewsCard';
import { latestNews } from '@/service/news';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AxiosError } from 'axios';
import { LatestNewsResponse } from '@/interfaces/Dto/News';


interface NewsSectionBodyProps {
  type: 'row' | 'column' | 'tile';
}

export default function NewsSectionBody({ type }: NewsSectionBodyProps) {
  const { cardDirection } = useSelector((state: RootState) => state.card);
  const { isLoading, data:newsList } = useQuery(['newslist'],()=>latestNews(),{
    select: (response) => response.data.data?.news
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }

  
  const hotNews = newsList[0];
  return (
    <div className="w-full">
      <div className={`m-auto flex flex-wrap gap-[10px] ${cardDirection === 'row' ? 'flex-col' : ''}`}>
        {type === 'column' ? (
          <NewsCard cardDirection="column" news={hotNews} />
        ) : (
          newsList &&
          newsList.map((item) => (
            <NewsCard cardDirection={cardDirection} key={item.newsId + Math.random()} news={item} />
          ))
        )}
      </div>
    </div>
  );
}
