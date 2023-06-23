import React from 'react'
import { InfoIcon } from '@/components/Icons'

export default function EmotionalScoreModal() {
  return (
    <div className='min-w-[250px] min-h-[163px] rounded-lg p-[20px] m-[20px] bg-white flex flex-col gap-[20px] shadow-[5px_5px_5px_rgba(0,0,0,0.2)]  border border-solid border-[rgba(0,0,0,0.2)] absolute -bottom-[100px] right-0 z-10'>
      <div className="title">
        <h3 className='flex align-center justify-center gap-[10px] text-[30px] font-semibold'> 
          <InfoIcon/>
          <span className='text-[24px]'>AI 감성 분석</span>
        </h3>
        <p className='text-center'>(최근 3시간 기준)</p>
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
