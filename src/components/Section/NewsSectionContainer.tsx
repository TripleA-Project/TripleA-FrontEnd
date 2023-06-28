import React from 'react'
import NewsSectionHeader from '@/components/Section/NewsSectionHeader';
import NewsSectionBody from './NewsSectionBody';

import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export interface NewsSectionContainerProps {
  type: 'column' | 'row'
  icon: ReactJSXElement,
  sectionTitle: '요즘 뉴스' | '최신 뉴스'
}

export default function NewsSectionContainer({type, icon ,sectionTitle}:NewsSectionContainerProps) {
  return (
    <div className='bg-white px-[16px]'>
      <NewsSectionHeader type={type} icon={icon} sectionTitle={sectionTitle}/>
      <NewsSectionBody type={type}/>
    </div>
  )
}
