"use client"
import React, {Fragment, useState} from 'react';
import NewsImage from './NewsImage'
import ChipContainer from './ChipContainer';
import News from './News'
import ButtonContainer from './ButtonContainer';

import { NewsData } from '@/interfaces/NewsData';

import styled from '@emotion/styled';

interface CardProps {
  cardDirection: string ;
}

const Card = styled.li<CardProps>`
  overflow:hidden;
  box-sizing: border-box;
  /* border-radius: 20px; */
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({cardDirection})=> cardDirection ===`column`? `296px`:`357px`};
  max-height: ${({cardDirection})=> cardDirection === `column`?`364px`:`122px`};
  .chipContainer {
  
  }
`



function CardNews({ newsId,symbol,logo, source, title, description, thumbnail,publishedDate, sentiment, bookmark}:NewsData) {

  const [cardDirection, setCardDirection] = useState('column')

  return (
    <Card cardDirection={cardDirection} >
      {cardDirection==='column'?(
      <>
        <div >
          <NewsImage thumbnail={thumbnail} cardDirection={cardDirection}/>
        </div>
        <div className='newsContainer'>
          <ChipContainer symbol={symbol} logo={logo}/>
          <News title={title} source={source} publishedDate={publishedDate} sentiment={sentiment} hole1={''} hole2={''} cardDirection={cardDirection}/>
          <ButtonContainer newsId={newsId} bookmark={bookmark}/>
        </div>
      </>):(
      <>
        <div className='chipContainer'>
          <ChipContainer symbol={symbol} logo={logo}/>
        </div>
        <div>
          <News title={title} source={source} publishedDate={publishedDate} sentiment={sentiment} hole1={<NewsImage thumbnail={thumbnail}/>} hole2={<ButtonContainer bookmark={bookmark} newsId={newsId}/>} cardDirection={cardDirection}/>
        </div>
      </>
      )}
    </Card>
  )
}

export default CardNews;
