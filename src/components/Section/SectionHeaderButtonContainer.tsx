"use client"

import React , {useState} from 'react'
import EmotionalScoreIcon from './EmotionalScoreIcon'
import EmotionalScoreModal from '../Modal/EmotionalScoreModal'

import { useCard } from '@/redux/slice/cardSlice'
import { setDirection } from '@/redux/slice/cardSlice'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface SectionHeaderButtonContainerProps {
  icons: ReactJSXElement[]
}

export default function SectionHeaderButtonContainer({icons}:SectionHeaderButtonContainerProps) {
  const [isClicked1, setIsClicked1] = useState(true)
  const [isClicked2, setIsClicked2] = useState(false)
  const [isClicked3, setIsClicked3] = useState(false)
  const {dispatch} = useCard()
  const hamburgerClickHandler = async () => {
  
      // await setCardDirection('row')
      dispatch(setDirection('row'))
      if(!isClicked1){
        setIsClicked1(!isClicked1)
        setIsClicked2(false)
      }
    
  }
  const gridClickHandler = async () => {
      // await setCardDirection('tile')
      dispatch(setDirection('tile'))
      if(!isClicked2){
        setIsClicked2(!isClicked2)
        setIsClicked1(false)
      }
    
  }
  const EmotionalIconClickHandler = () => {
    setIsClicked3(!isClicked3)
  }
  const iconClickHandler = () => {
    dispatch(setDirection('tile'))
  }
  return (
    <div className='flex justify-end gap-[10px] font-[24px]'>
      {icons.map((item) =>  <button key={item.key + Math.random()} onClick={iconClickHandler}>{item}</button> )} 
    </div>
  )
}
