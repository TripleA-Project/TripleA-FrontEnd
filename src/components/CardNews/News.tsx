import { NewsData } from '@/interfaces/NewsData'

import { ReactNode } from 'react'
import Bar from './Bar'

import styled from '@emotion/styled'

interface ContainerProps {
  cardDirections: string;
}

interface NewsProps extends Pick<NewsData,'title'| 'source'| 'publishedDate'| 'sentiment' >{
  hole1?: ReactNode;
  hole2?: ReactNode;
  cardDirection: string;
}
interface HoleProps {
  cardDirections: 'row'|'column';
}

const NewsContainer = styled.div`
  display:flex;
  /* justify-content: space-evenly; */
  /* padding: 15px 15px 0; */
  overflow: hidden;
  h3 {

    min-height: 40px;
    max-height: 66px;
  }
  .subText {
    span {
      font-size: 14px;
      padding-right: 5px;
    }
  }
`
const Container = styled.div<ContainerProps>`
  display: ${({cardDirection})=> cardDirection ==='row' ? 'grid' : 'auto'};
  grid-template-columns: 1fr 3fr 1fr;
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


export default function News({title, source , publishedDate , sentiment , hole1, hole2, cardDirection }:NewsProps) {
  return (
    <NewsContainer>
      <Bar sentiment={sentiment}/>
      <Container cardDirection={cardDirection}>
      {hole1 && <Hole1 cardDirection={cardDirection}>{hole1}</Hole1>}
        <div className="text">
          <h3>{title}</h3>
          <div className='subText'>
            <span>[{source}]</span>
            <span>{publishedDate}</span>
          </div>
        </div>
        {hole2 && <Hole2 cardDirection={cardDirection}>{hole2}</Hole2>}
      </Container>
    </NewsContainer>
  )
}
