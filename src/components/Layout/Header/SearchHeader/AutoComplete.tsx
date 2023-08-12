'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SymbolLogoImage from '@/components/Image/SymbolLogoImage';
import RecentSearch from './RecentSearch';
import { searchCategory } from '@/service/category';
import { searchSymbol } from '@/service/symbol';
import { isCategoryKeyword, isSymbolKeyword, setRecentSearchLocalStorage } from '@/util/autocomplete';
import { type SearchedSymbol } from '@/interfaces/Symbol';
import { type Category } from '@/interfaces/Category';

interface AutoCompleteProps {
  keyword: string;
  isFocus?: boolean;
}

function createMatchSymbolElement({
  keyword,
  symbol,
  index,
}: {
  keyword: string;
  symbol: SearchedSymbol;
  index: number;
}) {
  const highlightStartIdx = symbol.symbol.search(keyword);

  const handleClick = () => {
    setRecentSearchLocalStorage(symbol.symbol);
  };

  if (highlightStartIdx <= -1) {
    return (
      <Link
        key={`${symbol.symbol}-${symbol.companyName}-${index}`}
        href={`/chart/symbol?name=${symbol.symbol.toUpperCase()}&resample=daily`}
        className="box-border flex items-center gap-4 p-4"
        onClick={handleClick}
      >
        <SymbolLogoImage
          symbol={symbol.symbol}
          src={symbol.logo}
          type="Card"
          style={{ wrapper: { backgroundColor: '#fff' } }}
        />
        <div className="max-w-[calc(100%-64px)] flex-1 truncate mobile:max-w-[calc(100vw-64px)] pc:max-w-[calc(100%-64px)]">
          <div>
            <span className="font-semibold text-[#131F3C]">{symbol.symbol}</span>
          </div>
          {symbol.companyName ? <span className="text-sm text-[#131F3C]">{symbol.companyName}</span> : null}
        </div>
      </Link>
    );
  }

  const beforeHighlightText = symbol.symbol.substring(0, highlightStartIdx);
  const highlightText = symbol.symbol.substring(highlightStartIdx, highlightStartIdx + keyword.length);
  const afterHighlightText = symbol.symbol.substring(highlightStartIdx + keyword.length);

  return (
    <Link
      key={`${symbol.symbol}-${symbol.companyName}-${index}`}
      href={`/chart/symbol?name=${symbol.symbol.toUpperCase()}&resample=daily`}
      className="box-border flex items-center gap-4 p-4"
      onClick={handleClick}
    >
      <SymbolLogoImage
        symbol={symbol.symbol}
        src={symbol.logo}
        type="Card"
        style={{ wrapper: { backgroundColor: '#fff' } }}
      />
      <div className="max-w-[calc(100%-64px)] flex-1 truncate mobile:max-w-[calc(100vw-64px)] pc:max-w-[calc(100%-64px)]">
        <div>
          {beforeHighlightText ? <span className="font-semibold text-[#131F3C]">{beforeHighlightText}</span> : null}
          {highlightText ? <span className="font-semibold text-[#FD954A]">{highlightText}</span> : null}
          {afterHighlightText ? <span className="font-semibold text-[#131F3C]">{afterHighlightText}</span> : null}
        </div>
        {symbol.companyName ? <span className="text-sm text-[#131F3C]">{symbol.companyName}</span> : null}
      </div>
    </Link>
  );
}

function createMatchCategoryElement({ keyword, category }: { keyword: string; category: Category }) {
  const highlightStartIdx = category.category.search(keyword);

  const handleClick = () => {
    setRecentSearchLocalStorage(category.category);
  };

  if (highlightStartIdx <= -1) {
    return (
      <Link
        key={category.category}
        href={`/search/${encodeURIComponent(category.category)}`}
        className="box-border flex h-14 items-center p-4"
        onClick={handleClick}
      >
        <span className="font-semibold text-[#131F3C]">{category.category}</span>
      </Link>
    );
  }

  const beforeHighlightText = category.category.substring(0, highlightStartIdx);
  const highlightText = category.category.substring(highlightStartIdx, highlightStartIdx + keyword.length);
  const afterHighlightText = category.category.substring(highlightStartIdx + keyword.length);

  return (
    <Link
      key={category.category}
      href={`/search/${encodeURIComponent(category.category)}`}
      className="box-border flex h-14 items-center p-4"
      onClick={handleClick}
    >
      <div>
        {beforeHighlightText ? <span className="font-semibold text-[#131F3C]">{beforeHighlightText}</span> : null}
        {highlightText ? <span className="text-[#FD954A]">{highlightText}</span> : null}
        {afterHighlightText ? <span className="font-semibold text-[#131F3C]">{afterHighlightText}</span> : null}
      </div>
    </Link>
  );
}

function AutoComplete({ keyword, isFocus }: AutoCompleteProps) {
  const queryClient = useQueryClient();

  const {
    data: searchedSymbol,
    isFetching: isSymbolFetching,
    isSuccess: isSymbolFetchSuccess,
  } = useQuery(['search', 'symbol', 'keyword', keyword], () => searchSymbol({ symbol: keyword! }), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!keyword && isSymbolKeyword(keyword),
    select(response) {
      return response.data;
    },
  });

  const {
    data: searchedCategory,
    isFetching: isCategoryFetching,
    isSuccess: isCategoryFetchSuccess,
  } = useQuery(['search', 'category', 'keyword', keyword], () => searchCategory({ search: keyword }), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!keyword && isCategoryKeyword(decodeURIComponent(keyword)),
    select(response) {
      return response.data;
    },
  });

  const [searchSymbolResult, setSearchSymbolResult] = useState<SearchedSymbol[]>([]);
  const [searchCategoryResult, setSearchCategoryResult] = useState<Category[]>([]);

  useEffect(() => {
    setSearchCategoryResult([]);
    setSearchSymbolResult([]);
  }, [keyword]);

  useEffect(() => {
    if (isSymbolFetchSuccess) {
      setSearchSymbolResult(searchedSymbol.data ?? []);
    }
    if (isCategoryFetchSuccess) {
      setSearchCategoryResult(searchedCategory.data ?? []);
    }

    return () => {
      if (isSymbolFetching) {
        queryClient.cancelQueries(['search', 'symbol', 'keyword', keyword]);
      }

      if (isCategoryFetching) {
        queryClient.cancelQueries(['search', 'category', 'keyword', keyword]);
      }
    };
  }, [keyword, isSymbolFetchSuccess, isCategoryFetchSuccess]); /* eslint-disable-line */

  const getHasNotAutoCompleteResult = (keyword?: string) => {
    if (!keyword) return true;

    if (isCategoryKeyword(decodeURIComponent(keyword))) {
      return !searchCategoryResult.length;
    }

    if (isSymbolKeyword(decodeURIComponent(keyword))) {
      return !searchSymbolResult.length;
    }

    return true;
  };

  return isFocus ? (
    <div
      id="auto_complete"
      className={`absolute left-0 top-[calc(100%+1px)] box-border max-h-[calc(100vh-115px-30px)] w-full overflow-y-auto overflow-x-hidden ${
        getHasNotAutoCompleteResult(keyword) ? 'border-b-0' : 'border-b border-b-[#FD954A]'
      } bg-white scrollbar-thin`}
    >
      {keyword ? (
        <>
          {searchSymbolResult.length
            ? searchSymbolResult.map((matchedSymbol, index) =>
                createMatchSymbolElement({
                  keyword: keyword.toUpperCase(),
                  symbol: matchedSymbol,
                  index,
                }),
              )
            : null}
          {searchCategoryResult.length
            ? searchCategoryResult.map((matchedCategory) =>
                createMatchCategoryElement({
                  keyword,
                  category: matchedCategory,
                }),
              )
            : null}
        </>
      ) : (
        <RecentSearch />
      )}
    </div>
  ) : null;
}

export default AutoComplete;
