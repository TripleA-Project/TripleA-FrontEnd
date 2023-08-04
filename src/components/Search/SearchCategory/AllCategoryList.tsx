'use client';

import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import DispatchSearchCategoryChip from './DispatchSearchCategoryChip';
import { getAllCategory } from '@/service/category';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { HttpStatusCode } from 'axios';

interface AllCategoryListProps {
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function AllCategoryList({ onDispatch }: AllCategoryListProps) {
  const { data: allCategoryResponse, status: allCategoryStatus } = useQuery(['allCategory'], () => getAllCategory(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(payload) {
      return payload.data;
    },
    cacheTime: Infinity,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [expand, setExpand] = useState(false);

  if (allCategoryStatus === 'loading')
    return (
      <div className="mb-8 mt-[60px] h-[200px]">
        <div className="flex flex-wrap justify-center gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CategoryChip key={`loading-category-${idx}`} loading />
          ))}
        </div>
      </div>
    );

  if (!allCategoryResponse?.data?.length || allCategoryResponse.status === HttpStatusCode.Unauthorized)
    return (
      <div className="mb-8 mt-[60px] h-[200px]">
        <p className="text-[#9AA2A9]">전체 카테고리 목록을 제공할 수 없습니다.</p>
      </div>
    );

  return (
    <>
      <div className="relative mb-8 mt-[60px] h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
        <div
          ref={wrapperRef}
          className="overflow-hidden transition-[height]"
          style={{
            height: '100px',
          }}
        >
          <div ref={ref} className="flex flex-wrap justify-center gap-5">
            {allCategoryResponse.data?.map((category, idx) => (
              <DispatchSearchCategoryChip
                key={`allCategory-${category.categoryId}-${idx}`}
                category={category}
                allowClickDispatch
                onDispatch={onDispatch}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`${
          expand ? '-translate-y-5' : '-translate-y-[100px]'
        } flex w-full items-center justify-center transition-transform`}
      >
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => {
            if (!wrapperRef.current || !ref.current) return;

            if (expand) {
              wrapperRef.current.style.height = '100px';
              setExpand(false);

              return;
            }

            wrapperRef.current.style.height = `${ref.current.scrollHeight}px`;
            setExpand(true);
          }}
        >
          <MdOutlineArrowBackIosNew
            className={`origin-center ${expand ? 'rotate-90' : '-rotate-90'} text-sm text-[#454C52]`}
          />
          <span className="text-xs text-[#454C52]">{expand ? '접기' : '더 보기'}</span>
        </button>
      </div>
    </>
  );
}

export default AllCategoryList;
