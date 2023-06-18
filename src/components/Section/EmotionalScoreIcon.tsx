import React from 'react'

import { MouseEventHandler } from 'react'


export default function EmotionalScore({onClick}: MouseEventHandler) {
  return (
    <div className='w-[24px] h-[24px] rounded-[50%] bg-gradient-to-br from-[#FD954A]
 to-[#786BE4] hover:cursor-pointer' onClick={onClick}></div>
  )
}
