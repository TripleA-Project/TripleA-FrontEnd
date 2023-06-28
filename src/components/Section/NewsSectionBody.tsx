"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import CardNews from '../CardNews'
import { latestNews } from '@/service/news'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface NewsSectionBodyProps {
  type: 'row'| 'column' | 'tile'
}


export default function NewsSectionBody({type}:NewsSectionBodyProps) {
  const {cardDirection} = useSelector((state: RootState) => state.card)
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['newslist'],
    queryFn: ()=> latestNews()
    
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const newslist = data.data.data.news
  const hotNews = newslist[0]
  return (
    <div className='w-full'>
      <div className='flex gap-[10px] flex-wrap flex-shrink-0 m-auto justify-center' >
        {
        type==='column' ? <CardNews cardDirection='column' news={hotNews}/> : (newslist && newslist.map((item)=><CardNews cardDirection={cardDirection} key={item.newsId + Math.random() } news={item}/>))
        }
      </div>
    </div>
  )
}
