'use client';
import React, { useState } from 'react';
import { NewsData } from '@/interfaces/NewsData';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import SectionHeader from './SectionHeader';
import CardNews from '@/components/CardNews';

interface SectionContainerProps {
  newsArr: NewsData[];
  type: 'hotNews' | 'currentNews';
}

export default function SectionContainer({ newsArr, type }: SectionContainerProps) {
  const firstCardDirection = type === 'hotNews' ? 'column' : 'row';
  const [cardDirection, setCardDirection] = useState(firstCardDirection);

  return (
    <div className="bg-white px-[16px]">
      {type === 'hotNews' ? (
        <SectionHeader
          type={'hotNews'}
          icon={<MdOutlineLocalFireDepartment className="text-[24px]" />}
          title={'요즘 뉴스'}
        />
      ) : (
        <SectionHeader
          type={'currentNews'}
          icon={<BiNews className="text-[24px]" />}
          title={'최신 뉴스'}
          setCardDirection={setCardDirection}
        />
      )}
      <div className="flex flex-wrap gap-[10px]">
        {newsArr.map((news: NewsData) => (
          <CardNews
            description=""
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
          />
        ))}
      </div>
    </div>
  );
}
