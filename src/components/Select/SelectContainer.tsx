import React from 'react'
import Select from './index'
import { symbolInterface } from '@/constants/symbolArr'
import { categoryInterface } from '@/constants/newsCategory'

interface SelectContainerProps {
  arr: symbolInterface[] | categoryInterface[] 
  type: string,
  selectedArr?: [],
  setSelectedArr?: Function,
  number? : boolean
}

export default function SelectContainer({arr,type, selectedArr, setSelectedArr, number=false}:SelectContainerProps) {

  return (
    <div className='inline-flex flex-col gap-[6px] justify-start'>
    
{
      type === 'category' 
      ? arr.map((item)=>{return <Select key={item.categoryId} selectedArr={selectedArr} setSelectedArr={setSelectedArr} >{item.label}</Select>})
      : arr.map((item)=>{return <Select key={item.symbolId} selectedArr={selectedArr} setSelectedArr={setSelectedArr}>{item.logo}{item.symbol}{item.companyName}</Select>})
    }
 
    {
      number && <div></div>
    }
    </div>
  )
}
