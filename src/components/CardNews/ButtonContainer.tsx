"use client"
import { useState } from "react"
//types
import { Bookmark } from "@/interfaces/NewsData"
//components
import IconButton from "@/components/Button/IconButton"

import { addNewsBookmark, deleteNewsBookmark } from "@/service/bookmark"


interface ButtonContainerProps {
  newsId: number;
  bookmark: Bookmark; //count, isBookmark
}

export default function ButtonContainer({newsId,bookmark}:ButtonContainerProps){
  const count = bookmark?.count
  const isBookmark = bookmark?.isBookmark
  const [isMarked, setIsMarked] = useState(isBookmark)
  
  const bookmarkClickHandler = async() => {
  const res = isMarked ? await deleteNewsBookmark(newsId) : await addNewsBookmark(newsId)
  setIsMarked(!isMarked)
  console.log(res)
  alert('북마크 버튼이 눌렸습니다')
  }
  const shareClickHandler = () => {
    alert('공유 버튼이 눌렸습니다')
  }
  return (
    <div className="flex flex-row justify-end items-center gap-[6px]">
      <IconButton icon='export' bgColorTheme='none' textColorTheme='black' clickHandler={shareClickHandler}/>
      {isMarked ? 
        <IconButton icon='bookmarkfill' bgColorTheme='none' textColorTheme='black' clickHandler={bookmarkClickHandler} isBookmark={isBookmark}>{count && count}</IconButton>
        :
        <IconButton icon='bookmark' bgColorTheme='none' textColorTheme='black'clickHandler={bookmarkClickHandler} isBookmark={isBookmark}>{count && count}</IconButton>
      }
    </div>
  )
}
