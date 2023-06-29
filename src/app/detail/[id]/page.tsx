import React from 'react';
import { Metadata } from 'next';
import { IoIosArrowBack } from 'react-icons/io';
import NewsDetail from '@/components/NewsDetail';

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '개별 뉴스 상세',
  description: 'Triple A 개별 뉴스 상세',
};

function Detail({ params }: Props) {
  const id = params.id;
  console.log(params);
  return (
    <>
      <div className="relative h-[109px] border-b border-[#E8E8E8]">
        <button className="absolute left-[10px] top-[80%] translate-y-[-50%] text-[25px]">
          <IoIosArrowBack />
        </button>
      </div>
      <NewsDetail newsId={id} />
    </>
  );
}

export default Detail;
