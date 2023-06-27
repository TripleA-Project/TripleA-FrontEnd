"use client"
import React, { ReactNode} from 'react';
import NewsImage from './NewsImage'
import ChipContainer from './ChipContainer';
import News from './News'
import ButtonContainer from './ButtonContainer';

import { NewsData} from '@/interfaces/NewsData';

import styled from '@emotion/styled';

interface CardNewsProps {
  cardDirection: 'row'|'column'|'tile',
  news: NewsData
}

interface CardStyleProps {
  cardDirection: 'column' | 'row' | 'tile'
  sentimentColor: '#786BE4'|'#759DEB'|'#91DF75'|'#F6DD52'|'#FD954A'|'#000'
  children: ReactNode;
}

const Card = styled.li<CardStyleProps>`
  max-width: ${({cardDirection})=> cardDirection===`column` && `358px`};
  min-width:  ${({cardDirection})=> cardDirection ===`column`? `300px`:( cardDirection === `row` ? `357px` : ``)};
  width: ${({cardDirection})=> cardDirection ===`column`? ``:( cardDirection === `row` ? `100%` : `106px`)};
  min-height: ${({cardDirection})=> cardDirection === `column`?`344px`:( cardDirection === `row` ? `122px` : `auto`)};
  height : ${({cardDirection})=>cardDirection === `tile` && `106px`};
  padding: ${({cardDirection})=> cardDirection === `tile` && `12px`};
  background-color:${({cardDirection, sentimentColor})=> cardDirection === `tile` ? `${sentimentColor}` : `#fff`} ;
  .title {
    max-height: ${({cardDirection})=> cardDirection === `tile` && `70px`};
    font-size: ${({cardDirection})=> cardDirection === `tile` && `14px`};
    font-weight:${({cardDirection})=>cardDirection === `tile` && `600`};
  }
`



function CardNews({ news, cardDirection}:CardNewsProps) {

  const getSentimentColor = (sentiment:number)=> { 
    if(sentiment >= -10 && sentiment < 0.5){
      return '#786BE4'
    } else if (sentiment >= 0.5 && sentiment < 1.5){
      return '#759DEB'
    } else if (sentiment >= 1.5 && sentiment < 3.5 ){
      return '#91DF75'
    } else if (sentiment >= 3.5 && sentiment < 4.5){
      return '#F6DD52'
    } else if (sentiment >= 4.5 && sentiment < 10){
      return '#FD954A'
    } return '#000'
  }
  const sentimentColor = getSentimentColor(news.sentiment)
    
  return (
    <>
      <Card className='overflow-hidden box-border inline-flex rounded-2xl bg-white flex-col justify-between m-[10px]' cardDirection={cardDirection} sentimentColor={sentimentColor}>
        {cardDirection==='column'?
        <div className='column'>
          <div>
            <NewsImage thumbnail={news.thumbnail} cardDirection={cardDirection}/>
          </div>
          <div style={{padding: '10px'}}>
            <ChipContainer symbol={news.symbol} logo={news.logo}/>
            <News title={news.title} source={news.source} publishedDate={news.publishedDate} sentimentColor={sentimentColor} hole1={''} hole2={''} cardDirection={cardDirection}/>
            <ButtonContainer newsId={news.newsId} bookmark={news.bookmark}/>
          </div>
        </div>:
        cardDirection === 'row' ?
        <div className='row'>
          <ChipContainer symbol={news.symbol} logo={news.logo}/>
          <News title={news.title} source={news.source} publishedDate={news.publishedDate} sentimentColor={sentimentColor} hole1={<NewsImage thumbnail={news.thumbnail} cardDirection={cardDirection}/>} hole2={<ButtonContainer bookmark={news.bookmark} newsId={news.newsId}/>} cardDirection={cardDirection}/>
        </div>
        :
        <>
          <div className='title  overflow-hidden text-ellipsis '>{news.title}</div>
          <div className='time text-right text-[10px] font-semibold text-white'>{news.publishedDate}</div>
        </>
        }
      </Card>
    {cardDirection === 'row' &&  <div className='divider w-full h-[1.5px] bg-[#eee]'></div>}
    </>
  )
}

export default CardNews;
