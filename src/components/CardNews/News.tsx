import { NewsData } from '@/interfaces/NewsData'

import { ReactNode } from 'react'
import Bar from './Bar'
import styled from '@emotion/styled'


interface NewsProps extends Partial<NewsData> {
  hole1: ReactNode;
  hole2: ReactNode;
}

const NewsContainer = styled.div`
  display:flex;
`
const Hole1 = styled.div`
`
const Hole2 = styled.div``

export default function News({title, source , publishedDate , sentiment , hole1, hole2 }:NewsProps) {


  return (
    <NewsContainer>
      <Bar sentiment={sentiment}/>
      <Hole1>
        {hole1}
      </Hole1>
      <div>
        <h3>{title}</h3>
        <span>{source}</span>
        <span>{publishedDate}</span>
      </div>
     <Hole2>
      {hole2}
     </Hole2>
    </NewsContainer>
  )
}
