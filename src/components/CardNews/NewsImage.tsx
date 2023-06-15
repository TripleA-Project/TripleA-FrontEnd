import styled from '@emotion/styled'
import Image from 'next/image';
import { NewsData } from '@/interfaces/NewsData';


interface NewsImageProps extends Pick<NewsData,'thumbnail'>{
  cardDirection: 'column' | 'row';
}
interface ImageContainerProps extends NewsImageProps{
  
}
const ImageContainer = styled.div<ImageContainerProps>`
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  border-top-left-radius: 10px ;
  border-top-right-radius: 10px;
  border-bottom-left-radius: ${({cardDirection})=> cardDirection === 'column' ? 0 : '10px'};
  border-bottom-right-radius: ${({cardDirection})=> cardDirection === 'column' ? 0 : '10px'};
  background-color: red;
  width: ${({cardDirection})=> cardDirection === 'column' ? '358px':'66px'};
  height: ${({cardDirection})=> cardDirection === 'column' ? '197px':'66px'};
`

export default function NewsImage({thumbnail='https://giphy.com/gifs/running-muppets-7kn27lnYSAE9O', cardDirection}:NewsImageProps) {
  return (
    <ImageContainer thumbnail={thumbnail} cardDirection={cardDirection}>
      {/* {thumbnail && <Image loader={'https://giphy.com/gifs/running-muppets-7kn27lnYSAE9O'} src={thumbnail} alt='thumbnail' width={66} height={66}/>} */}
    </ImageContainer>
  )
}

