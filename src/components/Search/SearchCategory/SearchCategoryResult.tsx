'use client';

import React, { Suspense, useRef } from 'react';
import AllCategoryList from './AllCategoryList';
import DispatchSearchCategoryChip from './DispatchSearchCategoryChip';
import AllCategoriesLoading from './AllCategories/AllCategoriesLoading';
import ExpandButton from './AllCategories/ExpandButton';
import GuardBox from '@/components/UI/GuardBox';
import type { Category } from '@/interfaces/Category';

export interface AllCategoriesControl {
  isExpand: boolean;
  wrapperElement: HTMLDivElement | null;
  allCategoriesElement: HTMLDivElement | null;
  expand: () => void;
  shrink: () => void;
}

interface SearchCategoryResultProps {
  categories: Category[];
  isSyncing?: boolean;
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function SearchCategoryResult({ categories, onDispatch, isSyncing = false }: SearchCategoryResultProps) {
  const allCategoriesControlRef = useRef<AllCategoriesControl>(null);

  if (!categories?.length)
    return (
      <div className="relative mb-8 mt-[60px] h-[200px]">
        <Suspense fallback={<AllCategoriesLoading />}>
          <AllCategoryList ref={allCategoriesControlRef} isSyncing={isSyncing} onDispatch={onDispatch} />
          <ExpandButton ref={allCategoriesControlRef} />
        </Suspense>
      </div>
    );

  return (
    <div className="mb-8 mt-[60px] h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
      <div className="relative flex flex-wrap gap-5">
        <GuardBox activeGuard={isSyncing} />
        {categories.map((category, idx) => (
          <DispatchSearchCategoryChip
            key={`search-category-${category.categoryId}-${idx}`}
            category={category}
            allowClickDispatch
            onDispatch={onDispatch}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchCategoryResult;
