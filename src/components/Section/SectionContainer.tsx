"use client"
import React, {ReactNode} from 'react'
import SectionHeader from './SectionHeader';
import SectionBody from './SectionBody';
import { newsArr } from '@/constants/newsArr';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface NewsSectionContainerProps {
  type: string,
  icon:ReactNode,
  title: string
}

export default function SectionContainer({type, icon ,title}:NewsSectionContainerProps) {
    const {cardDirection} = useSelector((state: RootState) => state.card)
  console.log(cardDirection)
  return (
    <div className='bg-white px-[16px] min-w-[390px]'>
      <SectionHeader type={type} icon={icon} title={title}/>
      <SectionBody cardDirection={type==='hotNews'? 'column' : cardDirection} arr={newsArr}/>
    </div>
  )
}
