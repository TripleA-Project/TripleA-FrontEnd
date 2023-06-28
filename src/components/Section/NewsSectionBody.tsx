"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import CardNews from '../CardNews'
import { latestNews } from '@/service/news'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export default function NewsSectionBody() {
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
 
  return (
    <div>
      { newslist && newslist.map((item)=><CardNews cardDirection={cardDirection} key={item.newsId + Math.random() } news={item}/>)}
    </div>
  )
}
