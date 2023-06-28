import styled from '@emotion/styled'

interface ColorBarProps {
  sentimentColor: string;
}

const ColorBar = styled.div<ColorBarProps>`
  margin: 0 10px 0 0;
  width: 5px;
  height: 66px;
  border-radius:5px ;
  background-color: ${({sentimentColor})=>sentimentColor};
`

export default function Bar({sentimentColor}:ColorBarProps) {
  return <ColorBar sentimentColor={sentimentColor}/>
}
