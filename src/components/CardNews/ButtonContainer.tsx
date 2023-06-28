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
    } catch (error) {
    }
  }
  const shareClickHandler = async() => {
    const href = window.location.href;
    await handleCopyClipBoard(href)
    alert('주소가 복사되었습니다')
  }
  const bookmarkClickHandler = async(newsId:number) => {
    console.log('cloickefsdjhf')
    if(isMarked){
      setIsMarked(!isMarked)
      await deleteNewsBookmark({id:newsId}) 
      return
    } else {
      setIsMarked(!isMarked)
      await addNewsBookmark({id:newsId})
      return
    }
  }

  return (
    <div className="flex items-center justify-end gap-[6px] relative w-fit pl-[10px] pb-[10px]">
      <IconButton icon='export' bgColorTheme='none' textColorTheme='black' onClick={shareClickHandler}/>
      <IconButton icon={isMarked ? 'bookmarkfill' :'bookmark'} bgColorTheme='none' textColorTheme='black' onClick={()=>bookmarkClickHandler(newsId)} isBookmark={isBookmark}/>
    </div>
  )
}
