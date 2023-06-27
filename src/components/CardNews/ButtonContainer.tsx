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
  const handleCopyClipBoard = async(text:string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert(text)
    } catch (error) {
      console.log(error)
    }
  }
  const shareClickHandler = async() => {
    const href = window.location.href;
    await handleCopyClipBoard(href)
    alert('주소가 복사되었습니다')
  }
  const bookmarkClickHandler = async(newsId:number) => {
    if(isMarked){
      await deleteNewsBookmark({id:newsId}) 
      setIsMarked(!isMarked)
      return
    } else {
      await addNewsBookmark({id:newsId})
      setIsMarked(!isMarked)
      return
    }
  }

  return (
    <div className="flex flex-row justify-end items-center gap-[6px]">
      <IconButton icon='export' bgColorTheme='none' textColorTheme='black' onClick={shareClickHandler}/>
      {isMarked ? 
        <IconButton icon='bookmarkfill' bgColorTheme='none' textColorTheme='black' onClick={()=>bookmarkClickHandler(newsId)} isBookmark={isBookmark}>{count && count}</IconButton>
        :
        <IconButton icon='bookmark' bgColorTheme='none' textColorTheme='black' onClick={()=>bookmarkClickHandler(newsId)} isBookmark={isBookmark}>{count && count}</IconButton>
      }
    </div>
  )
}
