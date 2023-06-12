"use client"
import React, {useState} from 'react'
import Select from './index'
import { newsCategory } from '../../constants/newsCategory'

export default function SelectContainer() {
  const [selectedArray, setSelectedArray] = useState([])

  return (
    <>
    {
      newsCategory.map((select)=>{return <Select key={select.value} selectedArray={selectedArray} setSelectedArray={setSelectedArray}>{select.label}</Select>})
    }
    </>
  )
}
