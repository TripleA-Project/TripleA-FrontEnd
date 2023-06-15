'use client';

import React, { useState, ChangeEvent } from 'react';
import { Metadata } from 'next';
import { IoIosArrowBack } from 'react-icons/io';
import { NewsDetail } from '@/components/NewsDetail';
import ActionInput from '@/components/ActionInput';

export const metadata: Metadata = {
  title: '개별 뉴스 상세',
  description: 'Triple A 개별 뉴스 상세',
};

function Detail() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="relative h-[109px] w-[400px] border-b border-[#E8E8E8]">
        <button className="absolute left-[10px] top-[80%] translate-y-[-50%] text-[25px]">
          <IoIosArrowBack />
        </button>
        <ActionInput type="selectSearch" onChange={handleSearchChange} />
      </div>
      <NewsDetail />
    </>
  );
}

export default Detail;
