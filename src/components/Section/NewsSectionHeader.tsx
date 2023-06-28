import React from 'react'
import SectionHeaderButtonContainer from '@/components/Section/SectionHeaderButtonContainer'
import { NewsSectionContainerProps } from './NewsSectionContainer'
import { GridIcon, HamburgerIcon } from '../Icon'


//icon key 값 안 주면 에러납니다~ 
interface NewsSectionHeaderProps extends NewsSectionContainerProps {

}

export default function NewsSectionHeader({ icon, sectionTitle}:NewsSectionHeaderProps) {

  return (
    <div className='relative grid grid-cols-[1fr_9fr_1.5fr] items-center px-0 py-[25px]'>
      <div className='titleIcon'>{icon}</div>
      <div className='title text-[18px] font-semibold'>{sectionTitle}</div>
      <div>
        <SectionHeaderButtonContainer icons={[<HamburgerIcon key='1' />,<GridIcon key='2'/>]}/>
      </div>
    </div>
  )
}
