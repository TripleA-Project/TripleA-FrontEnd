import {css} from '@emotion/react'
import styled from '@emotion/styled'
import { NewsData } from '@/interfaces/NewsData'

interface ColorBarProps extends Pick<NewsData, 'sentiment'> {}

const ColorBar = styled.div<ColorBarProps>`
  margin: 0 10px 0 0;
  width: 5px;
  /* height: 72px; */
  border-radius:5px ;
  background-color: ${({sentiment})=>{
    if(sentiment>= -10 && sentiment < 0.5){
     return '#786BE4'
    } else if (sentiment >= 0.5 && sentiment < 1.5){
      return '#759DEB'
    } else if (sentiment >= 1.5 && sentiment < 3.5 ){
      return '#91DF75'
    } else if (sentiment >= 3.5 && sentiment < 4.5){
      return '#F6DD52'
    } else if (sentiment >= 4.5 && sentiment < 10){
      return '#FD954A'
    }}
};
`

export default function Bar({sentiment}:ColorBarProps) {
  return <ColorBar sentiment={sentiment}/>
}
