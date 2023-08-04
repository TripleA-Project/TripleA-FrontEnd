'use client';

import React from 'react';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import { unSelectCategory, useCategoryList } from '@/redux/slice/categorySlice';
import { type Category } from '@/interfaces/Category';

interface SelectedCategoryHorizonListProps {
  categories: Category[];
  shadowEffect?: boolean;
  closeButton?: boolean;
}

function SelectedCategoryHorizonList({ categories, shadowEffect, closeButton }: SelectedCategoryHorizonListProps) {
  const { dispatch, isLike } = useCategoryList();

  return categories.length ? (
    <div
      className="flex items-center gap-1 overflow-scroll scrollbar-none"
      onWheel={(e) => e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY })}
    >
      {categories.map((category, idx) => {
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
      })}
    </div>
  ) : null;
}

export default SelectedCategoryHorizonList;
