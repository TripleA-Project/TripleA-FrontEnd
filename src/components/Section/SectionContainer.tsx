"use client"
import React, {useState} from 'react'
import styled from '@emotion/styled'
import { NewsData } from '@/interfaces/NewsData'

import SectionHeader from './SectionHeader'
import {BiNews} from 'react-icons/bi'
import CardNews from '../CardNews'

import { newsArr } from '@/constants/newsArr'


export default function SectionContainer({newsArr}:{newsArr:NewsData[]}) {
 
  return (
    <div className='bg-white'>
      <SectionHeader icon={<BiNews className='text-[24px]'/>} title={'최신 뉴스'}/>
    <div className='flex flex-wrap gap-[10px]'>
    {newsArr.map((news:NewsData)=>
      <CardNews cardDirection='tile' key={news.newsId} newsId={news.newsId} symbol={news.symbol} source={news.source} title={news.title}  thumbnail={news.thumbnail} publishedDate={news.publishedDate} sentiment={news.sentiment} bookmark={news.bookmark}/>
    )}
    </div>
   </div>
  )
}
