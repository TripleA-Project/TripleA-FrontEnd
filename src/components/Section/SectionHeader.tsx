"use client"
import React, { ReactNode, useState } from 'react'
import styled from '@emotion/styled'
import ButtonContainer from '@/components/Button/ButtonContainer'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import EmotionalScoreIcon from './EmotionalScoreIcon'
import EmotionalScoreModal from '../Modal/EmotionalScoreModal'


interface SectionHeaderProps {
  type: 'hotNews'|'currentNews',
  icon: ReactNode,
  title: string,
  setCardDirection?: Function
}

const SectionHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 3fr;
  align-items: center;
  padding: 25px 0;
  .title {
    font-size: 18px;
    font-weight: 600;
  }
`

export default function SectionHeader({type, icon, title, setCardDirection}:SectionHeaderProps) {
    const [isClicked1, setIsClicked1] = useState(false)
    const [isClicked2, setIsClicked2] = useState(false)
    const [isClicked3, setIsClicked3] = useState(false)

    const hamburgerClickHandler = async () => {
      if(setCardDirection){
        await setCardDirection('row')
        setIsClicked1(!isClicked1)
        setIsClicked2(false)
      }
    }
    const gridClickHandler = async () => {
      if(setCardDirection){
        await setCardDirection('tile')
        setIsClicked2(!isClicked2)
        setIsClicked1(false)
      }
    }
    const emotionalIconClickHandler = () => {
      setIsClicked3(!isClicked3)
    }
  return (
    <SectionHeaderContainer className='relative'>
      <div className='titleIcon'>{icon}</div>
      <div className='title'>{title}</div>
      <div>
        <ButtonContainer>
          {
            type === 'hotNews' ? 
            <div></div> :    
            <>
              <GiHamburgerMenu className={'hover:cursor-pointer text-[24px]' + (isClicked1 ?' text-black':' text-gray-400' )} onClick={hamburgerClickHandler}/>
              <BsGrid3X3GapFill className={'hover:cursor-pointer text-[24px]' + (isClicked2 ?` text-black`:' text-gray-400') } onClick={gridClickHandler}/>
              <EmotionalScoreIcon onClick={emotionalIconClickHandler}/>
            </>
          }
        </ButtonContainer>
      </div>
      {isClicked3 && <EmotionalScoreModal />}
    </SectionHeaderContainer>
  )
}
