'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryNewsList from './CategoryNewsList';
import { NoResult } from './SearchResult';
import { searchCategory } from '@/service/category';
import { isKor } from '@/util/autocomplete';
import { type Category } from '@/interfaces/Category';

interface CategoryResultProps {
  keyword: string;
}

function CategoryResult({ keyword }: CategoryResultProps) {
  const { data: searchedCategory, status } = useQuery(
    ['search', 'category', 'keyword', keyword],
    () => searchCategory({ search: keyword }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!keyword && isKor(keyword),
      select(response) {
        return response.data;
      },
    },
  );

  const [category, setCategory] = useState<Category | null>(null);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (status !== 'success') return;

    const matchCategory = searchedCategory?.data?.find((matched) => matched.category === keyword);

    if (matchCategory) {
      setCategory(matchCategory);
    }

    setIsRender(true);
  }, [searchedCategory, status]); /* eslint-disable-line */

  if (status === 'loading') return null;
  if (status === 'error') return <NoResult />;

  return isRender ? category ? <CategoryNewsList category={category} /> : <NoResult /> : null;
}

export default CategoryResult;
