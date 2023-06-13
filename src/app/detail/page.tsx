'use client';

import React from 'react'
import { Metadata } from 'next';
import { IoIosArrowBack } from "react-icons/io";
import { NewsDetail } from '@/components/NewsDetail';

export const metadata: Metadata = {
  title: '개별 뉴스 상세',
  description: 'Triple A 개별 뉴스 상세',
};

function Detail() {
    return (
      <>
        <div className ="relative w-[400px] h-[109px] border-b border-[#E8E8E8]">
          <button className="absolute text-[25px] top-[80%] left-[10px] translate-y-[-50%]"><IoIosArrowBack/></button>
        </div>
        <NewsDetail/>
      </>
    )
}

export default Detail