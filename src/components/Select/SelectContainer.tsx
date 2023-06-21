import React from 'react'
import Select from './index'
import { symbolInterface } from '@/constants/symbolArr'
import { categoryInterface } from '@/constants/newsCategory'

interface SelectContainerProps {
  arr: symbolInterface[] | categoryInterface[] 
  type: string,
  selectedArr?: [],
  setSelectedArr?: Function,
}

export default function SelectContainer({arr,type, selectedArr, setSelectedArr}:SelectContainerProps) {

  return (
    <div className='flex flex-wrap gap-[4px] justify-start pl-[28px]'>
    {
      type === 'category' 
      ? arr.map((item)=>{return <Select key={item.categoryId} selectedArr={selectedArr} setSelectedArr={setSelectedArr} >{item.label}</Select>})
      : arr.map((item)=>{return <Select key={item.symbolId} selectedArr={selectedArr} setSelectedArr={setSelectedArr}>{item.logo}{item.symbol}{item.companyName}</Select>})
    }
    </div>
  )
}
