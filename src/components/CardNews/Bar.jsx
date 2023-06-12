import React from 'react'
import styled from '@emotion/styled'

const ColorBar = styled.div`
width: 5px;
height: 72px;
border-radius:5px ;
background-color: ${({color})=> color};
`

export default function Bar({color}) {
  return <ColorBar color={color}/>
}
