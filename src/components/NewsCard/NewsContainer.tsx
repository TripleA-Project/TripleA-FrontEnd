import React from 'react';
import { NewsData } from '@/interfaces/NewsData';
import Bar from '@/components/NewsCard/Bar';
import Select from '../Select';
import ImageContainer from './ImageContainer';
import ButtonContainer from './ButtonContainer';
import { newsSourceHandler, publishedDateHandler } from '@/util/news';

interface NewsContainerProps {
  width?: number;
  height: number;
  margin?: number;
  cardDirection: 'row' | 'column' | 'tile';
  news: NewsData;
}

export default function NewsContainer({ width = 358, height, margin, cardDirection, news }: NewsContainerProps) {
  const source = newsSourceHandler(news.source);
  const date = publishedDateHandler(news.publishedDate);

  return (
    <div className="flex" style={{ minWidth: `${width}px`, maxWidth: '676px', height: `${height}px` }}>
      {cardDirection === 'column' ? (
        <div className="flex">
          <Bar sentiment={news.sentiment} />
          <div>
            <div className="flex flex-col">
              <p className="line-clamp-2 text-[16px] font-semibold">{news.title}</p>
              <p className="text-[12px] font-semibold text-[#777]">{(source, date)}</p>
            </div>
            <div className="flex justify-between">
              <Select symbol={'AAPL'}>
                <div
                  className="h-[19px] w-[19px] rounded-[50%] bg-cover"
                  style={{ backgroundImage: `url(${news.logo})` }}
                ></div>
                <span>symbol</span>
                <span>companyName</span>
              </Select>
              <ButtonContainer news={news} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <ImageContainer width={66} height={72} thumbnail={news.thumbnail} />
          <div className="flex flex-col">
            <p className="line-clamp-2 text-[14px] font-semibold">{news.title}</p>
            <p className="text-[12px] font-semibold text-[#777]">{(source, date)}</p>
          </div>
          <ButtonContainer news={news} />
        </>
      )}
    </div>
  );
}
