'use client';

import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import GuardBox from '@/components/UI/GuardBox';
import DispatchSearchCategoryChip from './DispatchSearchCategoryChip';
import { getAllCategory } from '@/service/category';
import { HttpStatusCode } from 'axios';
import type { AllCategoriesControl } from './SearchCategoryResult';

interface AllCategoryListProps {
  isSyncing?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function AllCategoryList({ onDispatch, isSyncing }: AllCategoryListProps, ref: ForwardedRef<AllCategoriesControl>) {
  const { data: allCategoryResponse, error } = useQuery(['allCategory'], () => getAllCategory(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(payload) {
      return payload.data;
    },
    suspense: true,
    useErrorBoundary: false,
    cacheTime: Infinity,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const allCategoriesRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    isExpand: false,
    wrapperElement: wrapperRef.current,
    allCategoriesElement: allCategoriesRef.current,
    expand() {
      if (wrapperRef.current && allCategoriesRef.current) {
        wrapperRef.current.style.height = `${allCategoriesRef.current.scrollHeight}px`;
        this.isExpand = true;
      }
    },
    shrink() {
      if (wrapperRef.current) {
        wrapperRef.current.style.height = '100px';
        this.isExpand = false;
      }
    },
  }));

  if (!allCategoryResponse) return null;

  if (!allCategoryResponse?.data?.length || allCategoryResponse.status === HttpStatusCode.Unauthorized)
    return <p className="text-[#9AA2A9]">전체 카테고리 목록을 제공할 수 없습니다.</p>;

  return (
    <div className="max-h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
      <div
        ref={wrapperRef}
        className="relative overflow-hidden transition-[height]"
        style={{
          height: '100px',
        }}
      >
        <GuardBox activeGuard={isSyncing} />
        <div ref={allCategoriesRef} className="flex flex-wrap justify-center gap-5">
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
  );
}

export default forwardRef(AllCategoryList);
