"use client"
import React, {ReactNode, useState} from 'react'
import ButtonContainer from '@/components/Button/ButtonContainer'
import { HamburgerIcon, GridIcon } from '@/components/Icons'
import EmotionalScoreIcon from './EmotionalScoreIcon'
import EmotionalScoreModal from '../Modal/EmotionalScoreModal'


interface SectionHeaderProps {
  type: string,
  icon?: ReactNode,
  title: string,
  setCardDirection?: Function
}

export default function SectionHeader({type, icon, title, setCardDirection}:SectionHeaderProps) {
    const [isClicked1, setIsClicked1] = useState(true)
    const [isClicked2, setIsClicked2] = useState(false)
    const [isClicked3, setIsClicked3] = useState(false)

    const hamburgerClickHandler = async () => {
      if(setCardDirection){
        await setCardDirection('row')
        if(!isClicked1){
          setIsClicked1(!isClicked1)
          setIsClicked2(false)
        }
      }
    }
    const gridClickHandler = async () => {
      if(setCardDirection){
        await setCardDirection('tile')
        if(!isClicked2){
          setIsClicked2(!isClicked2)
          setIsClicked1(false)
        }
      }
    }
    const emotionalIconClickHandler = () => {
      setIsClicked3(!isClicked3)
    }
  return (
    <div className='relative grid grid-cols-[1fr_10fr_3fr] items-center px-0 py-[25px]'>
      <div className='titleIcon'>{icon}</div>
      <div className='title text-[18px] font-semibold'>{title}</div>
      <div>
        <ButtonContainer>
          {
            type === 'hotNews' ? 
            <div></div> :    
            <>
              <HamburgerIcon className={'hover:cursor-pointer text-[24px]' + (isClicked1 ?' text-black':' text-gray-400' )} onClick={hamburgerClickHandler}/>
              <GridIcon className={'hover:cursor-pointer text-[24px]' + (isClicked2 ?` text-black`:' text-gray-400') } onClick={gridClickHandler}/>
              <EmotionalScoreIcon onClick={emotionalIconClickHandler}/>
            </>
          }
        </ButtonContainer>
      </div>
      {isClicked3 && <EmotionalScoreModal/>}
    </div>
  )
}
