'use client';

import ActionInput from '@/components/ActionInput';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import LeftIcon from '../common/LeftIcon';
import RightIcon from '../common/RightIcon';
import { IconButtonProps } from '@/components/Button/IconButton';
import SearchResultsList from '@/components/SearchSymbolResultsList';
import { useQuery } from '@tanstack/react-query';
import { searchSymbol } from '@/service/symbol';
import { setSearchKeywordData, useSearch } from '@/redux/slice/searchSlice';
import { stringify } from 'querystring';
import { searchCategory } from '@/service/category';
import SearchCategoryResultsList from '@/components/SearchCategoryResultList';

interface SearchBarProps {
  leftIcon?: IconButtonProps['icon'] | 'LogoIcon';
  rightIcon?: IconButtonProps['icon'];
}

function SearchBar({ leftIcon, rightIcon }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [getCategoryId, setGetCategoryId] = useState<number|null>(null);
  const [tmpQuery, setTmpQuery] = useState<string>(searchValue);
  const [isClicked, setIsClicked] = useState<boolean>(true);
  const [selectedSymbol, setSelectedSymbol] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const { dispatch } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const englishRegex = /[a-zA-Z{1,5}]/;
  const matchSymbol = englishRegex.test(searchValue);
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const matchCategory = koreanRegex.test(searchValue);

  const {
    data: symbol,
    isLoading,
    error,
  } = useQuery(
    ['symbol', searchValue],
    () => searchSymbol({ symbol: searchValue }),

    {
      enabled: matchSymbol,
      staleTime: 0,
      cacheTime: 50000,
      refetchOnWindowFocus:false,
      retry: 0
    },
  );

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery(['category', searchValue], () => searchCategory({ search: searchValue }), {
    select: (response) => {
      return response.data.data;
    },
    enabled: matchCategory,
    retry: 0
  });

  const symbolData = symbol && symbol.data && symbol.data.data;

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTmpQuery(value);
    console.log(value);
    setIsClicked(true);
  };
  const clickHandle = () => {
    setIsClicked(false);
  };

  const selectSymbolHandle = (searchSymbolKeyword: string) => {
      setSelectedSymbol(searchSymbolKeyword);
      dispatch(setSearchKeywordData(searchSymbolKeyword));
      if (searchInputRef.current) {
        searchInputRef.current.value = searchSymbolKeyword.toLocaleLowerCase();
        setSearchValue(searchInputRef.current.value);
        setIsClicked(false);
      }
  };

  const selectCategoryHandle = (searchCategoryKeywordData:{categoryId:number, category: string}) => {
   setSelectedCategory(searchCategoryKeywordData)
   dispatch(setSearchKeywordData(searchCategoryKeywordData.categoryId.toString()))
   if(searchInputRef.current) {
    searchInputRef.current.value = searchCategoryKeywordData.category
    setGetCategoryId(searchCategoryKeywordData.categoryId)
    setIsClicked(false);
   }
  }


  const iconClickHandle = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      setSearchValue(searchInputRef.current.value);
      setIsClicked(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setSearchValue(tmpQuery);
    }, 500);
    return () => clearTimeout(debounce);
  }, [tmpQuery]);

  return (
    <div>
      <div className="flex justify-between border-b-[1px] border-b-[#FD954A] px-4 py-3">
        {leftIcon && <LeftIcon leftIcon={leftIcon} clickHandle={clickHandle} />}
        <ActionInput type="mainSearch" onChange={changeHandle} ref={searchInputRef} />
        {rightIcon && <RightIcon rightIcon={rightIcon} clickHandle={iconClickHandle} />}
      </div>
      <ul onClick={clickHandle} className="absolute border-b  bg-[#fff] shadow-md">
        {isClicked &&
          symbolData &&
          symbolData.map((symbolData: any) => (
            <SearchResultsList key={symbolData.symbolId} symbolData={symbolData} onSelect={selectSymbolHandle} />
          ))}
        {isClicked &&
          categoryData &&
          categoryData.map((categoryDataItem: any) => (
            <SearchCategoryResultsList key={categoryDataItem.categoryId} categoryData={categoryDataItem} onSelect={selectCategoryHandle} />
          ))}
      </ul>
    </div>
  );
}
``;
export default SearchBar;
