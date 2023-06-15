import { NewsData } from '@/interfaces/NewsData'

import { ReactNode } from 'react'
import Bar from './Bar'

import styled from '@emotion/styled'

interface NewsContainerProps {
  cardDirection:string;
}

interface ContainerProps {
  cardDirection: string;
  children: ReactNode;
}

interface NewsProps extends Pick<NewsData,'title'| 'source'| 'publishedDate'>{
  hole1?: ReactNode;
  hole2?: ReactNode;
  sentimentColor : string;
  cardDirection: string;
}
interface HoleProps {
  cardDirection: string;
  children: ReactNode;
}

const NewsContainer = styled.div<NewsContainerProps>`
  display:flex;
  /* justify-content: space-evenly; */
  /* padding: 15px 15px 0; */

  h3 {
    position: relative;
    min-height: 40px;
    max-height: 66px;
    margin: 0 0 0 10px;
  }
  .subText {
    position: absolute;
    bottom: ${({cardDirection})=>cardDirection==='column'?'-50px':'0px'};
    span {
      font-size: 14px;
      padding-right: 5px;
    }
  }
`
const Container = styled.div<ContainerProps>`
  display: ${({cardDirection})=> cardDirection ==='row' ? 'grid' : 'block'};
  grid-template-columns: ${({cardDirection})=> cardDirection==='row'?'1fr 3fr 1fr' : 'none'};
  justify-content: space-evenly;
`

const Hole1 = styled.div<HoleProps>`
    overflow: hidden;
    width: ${({cardDirection})=> cardDirection==='row'?'66px':'100%'};
    height: ${({cardDirection})=> cardDirection==='row'?'66px':'170px'};
    background-color: red;
`
const Hole2 = styled.div<HoleProps>`
overflow: hidden;
display: flex;
align-items: center;
`  


export default function News({title, source , publishedDate , sentimentColor , hole1, hole2, cardDirection }:NewsProps) {
  return (
    <NewsContainer cardDirection={cardDirection}>
      <Bar sentimentColor={sentimentColor}/>
      <Container cardDirection={cardDirection}>
        {hole1 && <Hole1 cardDirection={cardDirection}>{hole1}</Hole1>}
        <h3>
          {title}
          <div className='subText'>
            <span>[{source}]</span>
            <span>{publishedDate}</span>
          </div>
        </h3>
        {hole2 && <Hole2 cardDirection={cardDirection}>{hole2}</Hole2>}
      </Container>
     
    </NewsContainer>
  )
}
