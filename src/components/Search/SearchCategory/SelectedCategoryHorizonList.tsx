'use client';

import React from 'react';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import { unSelectCategory, useCategoryList } from '@/redux/slice/categorySlice';
import { type Category } from '@/interfaces/Category';

interface SelectedCategoryHorizonListProps {
  categories: Category[];
  shadowEffect?: boolean;
  closeButton?: boolean;
  loading?: boolean;
}

function SelectedCategoryHorizonList({
  categories,
  shadowEffect,
  closeButton,
  loading,
}: SelectedCategoryHorizonListProps) {
  const { dispatch, isLike } = useCategoryList();

  if (loading) {
    return (
      <div
        className="animate__animated animate__fadeIn flex items-center gap-1 overflow-scroll scrollbar-none"
        onWheel={(e) => e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY })}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <CategoryChip key={`horizonCategory-loading-${index}`} loading />
        ))}
      </div>
    );
  }

  return (
    <div
      className="animate__animated animate__fadeIn flex min-h-[36px] items-center gap-1 overflow-scroll scrollbar-none"
      onWheel={(e) => e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY })}
    >
      {categories.length
        ? categories.map((category, idx) => {
            return (
              <CategoryChip
                key={`${category.categoryId}-${idx}`}
                category={category}
                shadowEffect={shadowEffect}
                closeButton={closeButton}
                selected={isLike(category)}
                onClose={() => {
                  dispatch(unSelectCategory({ category }));
                }}
              />
            );
          })
        : null}
    </div>
  );
}

export default SelectedCategoryHorizonList;
