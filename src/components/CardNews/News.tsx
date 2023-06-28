import { NewsData } from '@/interfaces/NewsData'

import { ReactNode } from 'react'
import Bar from './Bar'

import styled from '@emotion/styled'

interface NewsContainerProps {
  cardDirection:'row'|'column'|'tile';
}

interface ContainerProps {
  cardDirection: 'row'|'column'|'tile';
  children: ReactNode;
}

interface NewsProps extends Pick<NewsData,'title'|'source'|'publishedDate'>{
  hole1?: ReactNode;
  hole2?: ReactNode;
  sentimentColor :  '#786BE4'|'#759DEB'|'#91DF75'|'#F6DD52'|'#FD954A'|'#000';
  cardDirection: 'row'|'column'|'tile';
}
interface HoleProps {
  cardDirection: 'row'|'column'|'tile';
  children: ReactNode;
}

const NewsContainer = styled.div<NewsContainerProps>`
  .subText {
    position: absolute;
    bottom: ${({cardDirection})=>cardDirection==='column'?'-50px':'0px'};
    span {
      font-size: 14px;
    }
  }
`
const Container = styled.div<ContainerProps>`
  display: ${({cardDirection})=> cardDirection ==='row' ? 'grid' : (cardDirection === 'column' ? 'block': 'flex' )};
  grid-template-columns: ${({cardDirection})=> cardDirection === 'row' && '1fr 8fr 2fr'};
`

const Hole1 = styled.div<HoleProps>`
    width: ${({cardDirection})=> cardDirection==='row'?'80px':'100%'};
    height: ${({cardDirection})=> cardDirection==='row'?'80px':'170px'};
    background-color: red;
  
`
const Hole2 = styled.div<HoleProps>`

`  


export default function News({title,source, publishedDate, sentimentColor , hole1, hole2, cardDirection }:NewsProps) {
  return (
    <NewsContainer className='flex relative' cardDirection={cardDirection}>
      <Bar sentimentColor={sentimentColor}/>
      <Container className='justify-evenly' cardDirection={cardDirection}>
        {hole1 && <Hole1 className='overflow-hidden' cardDirection={cardDirection}>{hole1}</Hole1>}
        <h3 className='ml-[10px] relative min-h-[40px] line-clamp-3 text-ellipsis'>
          {title}
        </h3>
        <p className='subText flex justify-end w-full pr-[15px]'>
          <span className='text-bold mb-[10px] mr-[10px]'>[{source.replace(/\.com$/,'')}]</span>
          <span>{publishedDate.substring(0,10)}</span>
        </p>
        {hole2 && <Hole2 className='overflow-hidden flex items-center justify-end' cardDirection={cardDirection}>{hole2}</Hole2>}
      </Container>
    </NewsContainer>
  )
}
