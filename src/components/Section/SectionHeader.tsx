"use client"
import React, {ReactNode, useState} from 'react'
import styled from '@emotion/styled'
import { IconType } from 'react-icons'
import {BiNews} from 'react-icons/bi'
import ButtonContainer from '@/components/Button/ButtonContainer'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import EmotionalScore from './EmotionalScoreIcon'


interface SectionHeaderProps {
  icon: ReactNode,
  title: string,

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

export default function SectionHeader({icon, title}:SectionHeaderProps) {
    const [isClicked1, setIsClicked1] = useState(false)
    const [isClicked2, setIsClicked2] = useState(false)
    const [isClicked3, setIsClicked3] = useState(false)

  return (
    <SectionHeaderContainer>
      <div className='titleIcon'>{icon}</div>
      <div className='title'>{title}</div>
      <div>
        <ButtonContainer>
          <GiHamburgerMenu className={'hover:cursor-pointer text-[24px]' + (isClicked1 ?' text-black':' text-gray-400' )} onClick={()=>{setIsClicked1(!isClicked1)}}/>
          <BsGrid3X3GapFill className={'hover:cursor-pointer text-[24px]' + (isClicked2 ?` text-black`:' text-gray-400') } onClick={()=>{setIsClicked2(!isClicked2)}}/>
          <EmotionalScore onClick={()=>{setIsClicked3(!isClicked3)
          console.log(isClicked3)}}/>
        </ButtonContainer>
      </div>
    </SectionHeaderContainer>
  )
}
