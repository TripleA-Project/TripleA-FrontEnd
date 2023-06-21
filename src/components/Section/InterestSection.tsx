"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import SelectContainer from '@/components/Select/SelectContainer'
import { PencilIcon } from '../Icons'
import IconButton from '../Button/IconButton'

interface InterestSectionProps {
  title: string,
  arr: object[],
  type:string,
}

export default function InterestSection({title, arr, type}:InterestSectionProps) {
  const [isOpened, setIsOpened] = useState(true)
  const router = useRouter()
  console.log(router)
  return (
      <div className=''>
        <h2 className='flex align-center gap-1 my-[10px]'>
          {isOpened
          ?<IconButton className=' text-[28px]' icon='right' sizeTheme='icon' bgColorTheme='none' textColorTheme='black' clickHandler={()=>{setIsOpened(!isOpened)}}/>
          :<IconButton className=' text-[28px]' icon='down' sizeTheme='icon' bgColorTheme='none' textColorTheme='black' clickHandler={()=>{setIsOpened(!isOpened)}}/>
          }
          <p className='text-[20px] font-semibold'>{title}</p>
          <PencilIcon className=' text-[#ADADAD] text-[28px] hover:cursor-pointer' onClick={title==='관심 카테고리'? () => router.push('/interested/category') : () => router.push('/interested/stock')}/>
        </h2>
        {isOpened && <SelectContainer arr={arr} type={type} />}
      </div>
     
    
  )
}
