import React from 'react';
import { NewsData } from '@/interfaces/NewsData';
import Bar from '@/components/NewsCard/Bar';
import Select from '../Select';
import ImageContainer from './ImageContainer';
import ButtonContainer from './ButtonContainer';

interface NewsContainerProps {
  width?: number;
  height: number;
  margin?: number;
  cardDirection: 'row' | 'column' | 'tile';
  news: NewsData;
}

export default function NewsContainer({ width = 358, height, margin, cardDirection, news }: NewsContainerProps) {




  return (
    <div className="flex" style={{ width: `${width}px`, height: `${height}px`, marginLeft: `${margin}px` }}>
      <Bar sentiment={news.sentiment} />
      <div>
        {cardDirection === 'column' ? (
          <>
            <div>
              <p className="line-clamp-2 text-[16px] font-semibold">{news.title}</p>
              <p className="text-[12px font-semibold text-[#777]">{(news.source, news.publishedDate)}</p>
            </div>
            <div>
              <div>
                <Select symbol={'AAPL'}>
                  <span>logo</span>
                  <span>symbol</span>
                  <span>companyName</span>
                </Select>
              </div>
              <ButtonContainer news={news} />
            </div>
          </>
        ) : (
          <>
            <div>
              <ImageContainer width={66} height={72} thumbnail={news.thumbnail} />
            </div>
            <div>
              <p className="line-clamp-2 text-[14px] font-semibold">{news.title}</p>
              <p className="text-[12px] font-semibold text-[#777]">{(news.source, news.publishedDate)}</p>
            </div>
            <div>
              <ButtonContainer news={news} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
