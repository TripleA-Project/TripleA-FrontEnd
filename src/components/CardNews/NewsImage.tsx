
import styled from '@emotion/styled'
import { NewsData } from '@/interfaces/NewsData';


const ImageContainer = styled.div<Partial<NewsData>>`
  width: 66px;
  height: 66px;
  background-image: url(${({thumbnail})=>thumbnail});
  background-repeat: no-repeat;
  background-size: cover;
`

export default function NewsImage({thumbnail}:Partial<NewsData>) {
  return (
    <ImageContainer thumbnail={thumbnail&&thumbnail}/>
  )
}

