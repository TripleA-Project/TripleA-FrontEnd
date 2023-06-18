"use client"

import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display:flex;
  justify-content: space-between;
  gap:6px;
  font-size: 24px;
`

export default function ButtonContainer({children}) {
  
  
  return (
    <Container>{children}</Container>
  )
}
