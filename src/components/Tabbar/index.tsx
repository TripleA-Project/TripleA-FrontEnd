"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
export default function Tabbar() {
  const [isScrollDown, setIsScrollDown] = useState(false)
  const [isFocused, setIsFocused] = useState(
    {
      all: true,
      interested: false
    }
  )
  const router = useRouter()
  const navigateToInterested = () => {
    router.push('/interested')
  }
  return (
    <>
    {!isScrollDown &&(
    <div className='relative w-[100%] h-[27px] grid grid-cols-[1fr_1fr] text-center font-semibold '>
      <div className='pt-[10px] bg-white hover:cursor-pointer' onClick={()=>{setIsFocused({all:true,interested:false})}}><span className={isFocused.all? `pb-[14px] border-b-[2px] border-b-[#000]`:`pb-[14px]`}>전체 뉴스</span></div>
      <div className='pt-[10px] bg-white hover:cursor-pointer' onClick={()=>{setIsFocused({all:false,interested:true})}}><span className={isFocused.interested? `pb-[14px] border-b-[2px] border-b-[#000]`:`pb-[14px]`}>관심 뉴스</span></div>
      {isFocused.interested && <div className='w-[50px] h-[50px] bg-black absolute right-0 hover:cursor-pointer' onClick={navigateToInterested}></div>}
    </div>)}
    
    </>
  )
}
