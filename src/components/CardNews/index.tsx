"use client"
import React, {Fragment, useState} from 'react';
import NewsImage from './NewsImage'
import ChipContainer from './ChipContainer';
import News from './News'
import ButtonContainer from './ButtonContainerComponent';

import { NewsData } from '@/interfaces/NewsData';

import styled from '@emotion/styled';

interface CardProps {
  direction: string ;
}

const Card = styled.li<CardProps>`
  display: flex;
  flex-direction: column;
  width: ${({direction})=> direction ===`column`? `296px`:`357px`};
  height: ${({direction})=> direction === `column`?`364px`:`122px`};
`

function CardNews({ symbol, logo, source, title, description, thumbnail,publishedDate, sentiment, bookmark}:NewsData) {

  const [cardDirection, setCardDirection] = useState('column')

  return (
    <Card direction={cardDirection} >
      {cardDirection==='column'?(
      <>
        <div>
          <NewsImage thumbnail={thumbnail}/>
        </div>
        <div>
          <ChipContainer symbol={symbol} logo={logo}/>
          <News title={title} description={description} source={source} date={publishedDate} sentiment={sentiment} hole1={<Fragment/>} hole2={<Fragment/>}/>
          <ButtonContainer bookmark={bookmark}/>
        </div>
      </>):(
      <>
        <div>
          <ChipContainer symbol={symbol} logo={logo}/>
        </div>
        <div>
          <News title={title} description={description} source={source} date={publishedDate} sentiment={sentiment} hole1={<NewsImage src={thumbnail}/>} hole2={<ButtonContainer bookmark={bookmark}/>}/>
        </div>
      </>
      )}
    </Card>
  )
}

export default CardNews;
