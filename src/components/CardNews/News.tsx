import { NewsData } from '@/interfaces/NewsData'

import { ReactNode } from 'react'
import Bar from './Bar'

import styled from '@emotion/styled'

interface NewsProps extends Pick<NewsData,'title'| 'source'| 'publishedDate'| 'sentiment' >{
  hole1?: ReactNode;
  hole2?: ReactNode;
}

const NewsContainer = styled.div`
  display:flex;
`


export default function News({title, source , publishedDate , sentiment , hole1, hole2 }:NewsProps) {
  return (
    <NewsContainer>
      <Bar sentiment={sentiment}/>
      <div>
        {hole1 && hole1}
        <h3>{title}</h3>
        <span>{source}</span>
        <span>{publishedDate}</span>
        {hole2 && hole2}
      </div>
    </NewsContainer>
  )
}
