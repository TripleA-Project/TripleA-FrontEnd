"use client"

import React , {useState} from 'react'
import EmotionalScoreIcon from './EmotionalScoreIcon'
import EmotionalScoreModal from '../Modal/EmotionalScoreModal'
import { HamburgerIcon } from '@/components/Icon'
import { GridIcon } from '@/components/Icon'
import { useDispatch } from 'react-redux'
import { setDirection } from '@/redux/slice/cardSlice'

export default function SectionHeaderButtonContainer({type}) {
  const [isClicked1, setIsClicked1] = useState(true)
  const [isClicked2, setIsClicked2] = useState(false)
  const [isClicked3, setIsClicked3] = useState(false)
  const dispatch = useDispatch()

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
  
  return (
    <div className='flex justify-end gap-[10px] font-[24px]'>
          {
            type === 'hotNews' ? 
            <>
              <EmotionalScoreIcon onClick={EmotionalIconClickHandler}/>
              {isClicked3 && <EmotionalScoreModal/>}
            </> :    
            <>
              <HamburgerIcon className={'hover:cursor-pointer text-[24px]' + (isClicked1 ?' text-black':' text-gray-400' )} onClick={hamburgerClickHandler}/>
              <GridIcon className={'hover:cursor-pointer text-[24px]' + (isClicked2 ?` text-black`:' text-gray-400') } onClick={gridClickHandler}/>
            </>
          }
    </div>
  )
}
