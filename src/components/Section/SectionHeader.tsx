import React, {ReactNode, useState} from 'react'
import ButtonContainer from '@/components/Section/SectionHeaderButtonContainer'

interface SectionHeaderProps {
  type: string,
  icon?: ReactNode,
  title: string,

}

export default function SectionHeader({ type,icon, title}:SectionHeaderProps) {

  return (
    <div className='relative grid grid-cols-[1fr_10fr_3fr] items-center px-0 py-[25px]'>
      <div className='titleIcon'>{icon}</div>
      <div className='title text-[18px] font-semibold'>{title}</div>
      <div>
        <ButtonContainer type={type} />
      </div>
    </div>
  )
}
