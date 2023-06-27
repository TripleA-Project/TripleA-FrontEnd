import styled from '@emotion/styled'
import Image from 'next/image';
import { NewsData } from '@/interfaces/NewsData';


interface NewsImageProps extends Pick<NewsData,'thumbnail'>{
  cardDirection: string;
}
interface ImageContainerProps extends NewsImageProps{
  
}
const ImageContainer = styled.div<ImageContainerProps>`
  border-bottom-left-radius: ${({cardDirection})=> cardDirection === 'column' ? 0 : '12px'};
  border-bottom-right-radius: ${({cardDirection})=> cardDirection === 'column' ? 0 : '12px'};
  background-color: red;
  width: ${({cardDirection})=> cardDirection === 'column' ? '358px':'66px'};
  height: ${({cardDirection})=> cardDirection === 'column' ? '197px':'66px'};
`

export default function NewsImage({thumbnail, cardDirection}:NewsImageProps) {
  
  return (
    <ImageContainer className='rounded-t-xl overflow-hidden box-border w-full' thumbnail={thumbnail} cardDirection={cardDirection}>
      {thumbnail && <Image src={thumbnail} alt='thumbnail' width={66} height={66}/>}
    </ImageContainer>
  )
}

