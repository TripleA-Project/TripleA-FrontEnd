"use client"
import { useState } from "react"
//types
import { Bookmark } from "@/interfaces/NewsData"

//components
import IconButton from "@/components/Button/IconButton"

//styles
import styled from "@emotion/styled"

interface ButtonContainerProps {
  newsId: number;
  bookmark: Bookmark; //count, isBookmark
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
  align-items: flex-start;
  padding: 4px;
`

export default function ButtonContainer({newsId,bookmark}:ButtonContainerProps){
  const count = bookmark?.count
  const isBookmark = bookmark?.isBookmark
  const [isMarked, setIsMarked] = useState(isBookmark)
  const bookmarkClickHandler = () => {
  setIsMarked(!isBookmark)
  alert('북마크 버튼이 눌렸습니다')
  }
  const shareClickHandler = () => {
    alert('공유 버튼이 눌렸습니다')
  }
  return (
    <Container>
      <IconButton icon='export' bgColorTheme='none' textColorTheme='black' clickHandler={shareClickHandler}/>
      {isBookmark ? 
        <IconButton icon='bookmarkfill' bgColorTheme='none' textColorTheme='black' clickHandler={bookmarkClickHandler} isBookmark={isBookmark}>{count && count}</IconButton>:
        <IconButton icon='bookmark' bgColorTheme='none' textColorTheme='black'clickHandler={bookmarkClickHandler} isBookmark={isBookmark}>{count && count}</IconButton>
      }
    </Container>
  )
}
