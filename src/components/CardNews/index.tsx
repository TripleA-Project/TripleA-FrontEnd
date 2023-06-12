"use client"
import React, {Fragment, useState} from 'react';
import NewsImage from './NewsImage'
import ChipContainer from './ChipContainer';
import News from './News'
import ButtonContainer from './ButtonContainerComponent';
import styled from '@emotion/styled';

// {
//   "status":200,
//   "msg": "성공",
//   "data": {
//    "nextPage": 5555,
//    "news": [
//      {
//        "newsId": 1,
//        ”symbol”:”symbol”,
//        ”logo”:”logo”,
//        "source": "source",
//        "title": "title",
//        "description": "description",
//        ”thumbnail”:”thumbnail”,
//        "publishedDate": "2023-05-05T00:00:00",
//        ”sentiment”:2,
//        "bookmark": {
//          "count": 10,
//          "isBookmark": true
//         }
//      },
//      ...
//    ]
//   }
// }
interface NewsItem {
  newsId : number;
  symbol : string;
  logo:string;
  source: string;
  title: string;
  description: string;
  thumbnail:string;
  publishedDate: string;
  sentiment:number;
  bookmark: {
    count: number;
    isBookmark: boolean;
  }     
}

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: ${({direction})=> direction ===`column`? `296px`:`357px`};
  height: ${({direction})=> direction === `column`?`364px`:`122px`};
`

function CardNews({ symbol, logo, source, title, description, thumbnail,publishedDate, sentiment, bookmark}:NewsItem) {

  const [cardDirection, setCardDirection] = useState('column')

  return (
    <Card direction={cardDirection} >
      {cardDirection==='column'?(
      <>
        <div>
          <NewsImage src={thumbnail}/>
        </div>
        <div>
          <ChipContainer symbol={symbol} logo={logo}/>
          <News title={title} description={description} board={source} time={publishedDate} hole1={<Fragment/>} hole2={<Fragment/>}/>
          <ButtonContainer bookmark={bookmark}/>
        </div>
      </>):(
      <>
        <div>
          <ChipContainer symbol={symbol} logo={logo}/>
        </div>
        <div>
          <News title={title} description={description} board={source} time={publishedDate} hole1={<NewsImage src={thumbnail}/>} hole2={<ButtonContainer bookmark={bookmark}/>}/>
        </div>
      </>
      )}
    </Card>
  )
}

export default CardNews;
