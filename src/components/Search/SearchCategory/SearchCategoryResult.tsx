import React from 'react';
import AllCategoryList from './AllCategoryList';
import DispatchSearchCategoryChip from './DispatchSearchCategoryChip';
import { type Category } from '@/interfaces/Category';

interface SearchCategoryResultProps {
  loading: boolean;
  categories: Category[];
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function SearchCategoryResult({ categories, loading, onDispatch }: SearchCategoryResultProps) {
  if (!categories?.length) return <AllCategoryList onDispatch={onDispatch} />;

  return (
    <div className="mb-8 mt-[60px] h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
      <div className="flex flex-wrap gap-5">
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
