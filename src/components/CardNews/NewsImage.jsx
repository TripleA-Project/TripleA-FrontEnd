import React from 'react'
import styled from '@emotion/styled'

const ImageContainer = styled.div`
  width: 66px;
  height: 66px;
  /* background-image: ${({src})=> url({src})}; */
  background-repeat: no-repeat;
  background-size: cover;
`

export default function NewsImage({src}) {
  return (
    <ImageContainer src={src}/>
  )
}

