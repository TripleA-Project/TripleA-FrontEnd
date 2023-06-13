
import Bar from './Bar'
import styled from '@emotion/styled'


const NewsContainer = styled.div`
  display:flex;
`
const Hole1 = styled.div`
`
const Hole2 = styled.div``

export default function News({title, source , date , sentiment , hole1, hole2}:NewsProps) {


  return (
    <NewsContainer>
      <Bar/>
      <Hole1 className='hole1'>
        {hole1}
      </Hole1>
      <div>
        <h3>{title}</h3>
        <span>{board}</span>
        <span>{time}</span>
      </div>
     <Hole2 className='hole2'>
      {hole2}
     </Hole2>
    </NewsContainer>
  )
}
