"use client"
import React from 'react'
import styled from '@emotion/styled'
import { MdInfoOutline } from 'react-icons/md'

const ModalTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  font-weight: 600;
  span {
    font-size: 24px;
  }
`
const ModalSubTitle = styled.h4`
 text-align:center;
`

export default function EmotionalScoreModal() {
  return (
    <div className='min-w-[173px] min-h-[163px] rounded-lg p-[20px] m-[20px] bg-white flex flex-col gap-[20px] shadow-[5px_5px_5px_rgba(0,0,0,0.2)]'>
      <div className="title">
        <ModalTitle><MdInfoOutline/><span>AI 감성 분석</span></ModalTitle>
        <ModalSubTitle>(최근 3시간 기준)</ModalSubTitle>
      </div>
      <div className="scorePercentages flex align-center justify-between">
        <div className='flex gap-[5px]'>
          <div className='w-[24px] h-[24px] bg-[#FD9549] flex justify-center align-center text-white rounded-lg'>+</div>
          <span className='text-[#4E525D] font-[550]'>47%</span>
        </div>
        <div className='flex gap-[5px]'>
          <div className='w-[24px] h-[24px] bg-[#91DF75] flex justify-center align-center text-white rounded-lg'>•</div>
          <span className='text-[#4E525D] font-[550]'>25%</span>
        </div>
        <div className='flex gap-[5px]'>
          <div className='w-[24px] h-[24px] bg-[#786AE4] flex justify-center align-center text-white rounded-lg'>-</div>
          <span className='text-[#4E525D] font-[550]'>28%</span>
        </div>
      </div>
      <div>
        <div className='scoreGraph min-w-[140px] h-[24px] rounded-lg bg-gradient-to-r from-[#FD9549] via-[#91DF75] to-[#786AE4]'></div>
        <div className='flex justify-between align-center'>
          <div className='flex flex-col justify-center w-[30px]'>
            <div className='text-[#FD9549] text-center'>▴</div>
            <div className='text-center'>10</div>
          </div>
          <div className='flex flex-col justify-center w-[30px]'>
            <div className='text-[#91DF75] text-center'>▴</div>
            <div className='text-center'>1</div>
          </div>
          <div className='flex flex-col justify-center w-[30px]'>
            <div className='text-[#786AE4] text-center'>▴</div>
            <div className='text-center' >-10</div>
          </div>
        </div>
      </div>
     
    </div>
  )
}