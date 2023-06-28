'use client';
import { SearchSymbolResponse } from '@/interfaces/Dto/Symbol';
;
import React, { useEffect } from 'react';

interface SearchResultsListProps {
  symbolData: SearchSymbolResponse;
}

function SearchCategoryResultsList({ categoryData, onSelect }: any) {
  useEffect(() => {}, [categoryData.category]);
  if (!categoryData) {
    return null;
  }

  const selectHandle = () => {
    onSelect({categoryId:categoryData.categoryId, category: categoryData.category });
    console.log({categoryId:categoryData.categoryId, category: categoryData.category })
  };

  return (
    <li key={categoryData.categoryId} className="p-4" onClick={selectHandle}>
      {categoryData.category}
    </li>
  );
}

export default SearchCategoryResultsList;
