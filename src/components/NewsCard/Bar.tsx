import styled from '@emotion/styled'


interface BarProps {
  sentiment: number,
}
interface ColorBarProps {
  sentimentColor: string;
}

const ColorBar = styled.div<ColorBarProps>`
  background-color: ${({sentimentColor})=>sentimentColor};
`

export default function Bar({sentiment}:BarProps) {
  
  const getSentimentColor = (sentiment:number)=> { 
    if(sentiment >= -10 && sentiment < 0.5){
      return '#786BE4'
    } else if (sentiment >= 0.5 && sentiment < 1.5){
      return '#759DEB'
    } else if (sentiment >= 1.5 && sentiment < 3.5 ){
      return '#91DF75'
    } else if (sentiment >= 3.5 && sentiment < 4.5){
      return '#F6DD52'
    } else if (sentiment >= 4.5 && sentiment < 10){
      return '#FD954A'
    } return '#000'
  }
  const sentimentColor = getSentimentColor(sentiment)

  return <ColorBar  sentimentColor={sentimentColor} className='h-full w-[5px] rounded-[5px]'/>
}
