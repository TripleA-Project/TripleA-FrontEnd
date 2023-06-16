"use client"
import React, { ReactNode, useState} from 'react';
import NewsImage from './NewsImage'
import ChipContainer from './ChipContainer';
import News from './News'
import ButtonContainer from './ButtonContainer';

import { NewsData } from '@/interfaces/NewsData';

import styled from '@emotion/styled';

interface CardProps {
  cardDirection: string; //column, row, tile
  sentimentColor: string;
  children: ReactNode;
}

const Card = styled.li<CardProps>`
  overflow:hidden;
  box-sizing: border-box;
  margin: 10px;
  padding: ${({cardDirection})=> cardDirection === `tile` && `12px`};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({cardDirection})=> cardDirection ===`column`? `358px`:( cardDirection === `row` ? `357px` : `106px`)};
  min-height: ${({cardDirection})=> cardDirection === `column`?`344px`:( cardDirection === `row` ? `122px` : `auto`)};
  height : ${({cardDirection})=>cardDirection === `tile` && `106px`};
  background-color:${({cardDirection, sentimentColor})=> cardDirection === `tile` ? `${sentimentColor}` : `#fff`} ;
  .title {
    width: ${({cardDirection})=>cardDirection === `tile` ? `auto` : `106px`};
    /* height: 106px; */
    font-size: ${({cardDirection})=> cardDirection === `tile` && `14px`};
    font-weight:${({cardDirection})=>cardDirection === `tile` && `600`};
    overflow: hidden; /*자르세요*/
    text-overflow: ellipsis;/* 생략하세요 */
  }
  .time {
    text-align: right;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
  }
`



function CardNews({ newsId,symbol,logo, source, title, thumbnail,publishedDate, sentiment, bookmark}:NewsData) {

  const [cardDirection, setCardDirection] = useState('tile')

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
    }
  }
  const sentimentColor = getSentimentColor(sentiment)
    
  



  return (
    <Card cardDirection={cardDirection} sentimentColor={sentimentColor}>
      {cardDirection==='column'?
      <div className='column'>
        <div >
          <NewsImage thumbnail={thumbnail} cardDirection={cardDirection}/>
        </div>
        <div style={{padding: '10px'}}>
          <ChipContainer symbol={symbol} logo={logo}/>
          <News title={title} source={source} publishedDate={publishedDate} sentimentColor={sentimentColor} hole1={''} hole2={''} cardDirection={cardDirection}/>
          <ButtonContainer newsId={newsId} bookmark={bookmark}/>
        </div>
      </div>:
      cardDirection === 'row' ?  
      <div className='row'>
        <div className='chipContainer'>
          <ChipContainer symbol={symbol} logo={logo}/>
        </div>
        <div>
          <News title={title} source={source} publishedDate={publishedDate} sentimentColor={sentimentColor} hole1={<NewsImage thumbnail={thumbnail}/>} hole2={<ButtonContainer bookmark={bookmark} newsId={newsId}/>} cardDirection={cardDirection}/>
        </div>
      </div>
      :
      <>
        <div className='title'>{title}</div>
        <div className='time'>{publishedDate}</div>
      </>
      }
    </Card>
  )
}

export default CardNews;
