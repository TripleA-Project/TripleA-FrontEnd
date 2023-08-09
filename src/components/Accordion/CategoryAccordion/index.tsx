'use client';

import React from 'react';
import { getLikeCategory } from '@/service/category';
import { useQuery } from '@tanstack/react-query';
import Accordion from '..';
import Link from 'next/link';
import { AppIcons } from '@/components/Icons';
import CategoryChip from '@/components/UI/Chip/CategoryChip';

function CategoryAccordion() {
  const { data: likedCategory, status: likedCategoryStatus } = useQuery(
    ['likedCategoryList'],
    () => getLikeCategory(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(payload) {
        return payload.data;
      },
    },
  );

  return (
    <Accordion
      summary={
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">관심 카테고리</span>
          <Link href="/mypage/edit/category" onClick={(e) => e.stopPropagation()}>
            <AppIcons.Edit />
          </Link>
        </div>
      }
      detail={
        <div className="flex max-h-[252px] w-max flex-col gap-3 overflow-auto scrollbar-none">
          {likedCategoryStatus === 'loading' ? (
            <>
              {Array.from({ length: 3 }).map((_, idx) => (
                <CategoryChip key={idx} loading />
              ))}
            </>
          ) : null}
          {likedCategory?.data ? (
            <>
              {likedCategory.data.map((category, idx) => {
                return <CategoryChip key={`${category.category}${idx}`} category={category} selected />;
              })}
            </>
          ) : null}
        </div>
      }
    />
  );
}

export default CategoryAccordion;
