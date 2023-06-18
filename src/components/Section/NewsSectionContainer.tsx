"use client"
import React, {ReactNode, useState} from 'react'
import NewsSectionHeader from './NewsSectionHeader'
import CardNewsContainer from '../CardNews/CardNewsContainer'
import { NewsData } from '@/interfaces/NewsData'

interface NewsSectionContainerProps {
  type: string,
  icon: ReactNode,
  title: string,
  firstCardDirection:string,
  newsArr: NewsData[]
}

export default function NewsSectionContainer({type, icon, title, firstCardDirection, newsArr}:NewsSectionContainerProps) {
    const [cardDirection, setCardDirection] = useState(firstCardDirection)
  return (
    <div className='bg-white px-[16px]'>
      <NewsSectionHeader type={type} icon={icon} title={title} setCardDirection={setCardDirection}/>
      <CardNewsContainer newsArr={newsArr} cardDirection={cardDirection}/>
   </div>
  )
}
