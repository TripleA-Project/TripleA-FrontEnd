import React from 'react'
import CardNews from '../CardNews'
import { NewsData } from '@/interfaces/NewsData'
interface SectionBodyProps {
  cardDirection: string | 'row' | 'column' | 'tile',
  arr : NewsData[]
}

export default function SectionBody({cardDirection, arr}:SectionBodyProps) {
  return (
    <div>
      {arr.map((item)=><CardNews cardDirection={cardDirection} key={item.newsId} newsId={item.newsId} symbol={item.symbol} logo={item.logo} source={item.source} title={item.title} thumbnail={item.thumbnail} publishedDate={item.publishedDate} sentiment={item.sentiment} bookmark={item.bookmark}/>)}
    </div>
  )
}
