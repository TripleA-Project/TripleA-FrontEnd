import React from 'react';
import { Metadata } from 'next';
import { IoIosArrowBack } from 'react-icons/io';
import NewsDetail from '@/components/NewsDetail';
import { useRouter } from 'next/router';

export const metadata: Metadata = {
  title: '개별 뉴스 상세',
  description: 'Triple A 개별 뉴스 상세',
};

function Detail() {
  const router = useRouter();
  const { newsId } = router.query;
  return (
    <>
      <div className="relative h-[109px] border-b border-[#E8E8E8]">
        <button className="absolute left-[10px] top-[80%] translate-y-[-50%] text-[25px]" onClick={() => router.back()}>
          <IoIosArrowBack />
        </button>
      </div>
      <NewsDetail newsId={newsId as string} />
    </>
  );
}

export default Detail;
