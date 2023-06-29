'use client';

import React from 'react';
import SymbolCard from '../SymbolCard';
import { setSearchKeywordData, useSearch } from '@/redux/slice/searchSlice';
import { useQuery } from '@tanstack/react-query';
import SymbolCardBar from '../SymbolCard/SymbolCardBar';
import { searchSymbol } from '@/service/symbol';
import { Symbol } from '@/interfaces/Symbol';
import { searchCategoryNews, searchSymbolNews } from '@/service/news';
import NewsCard from '../NewsCard';
import NewsSectionHeader from '../Section/NewsSectionHeader';

function SearchPageContainer() {
  const { searchValue, dispatch } = useSearch();

  const englishRegex = /[a-zA-Z{1,5}]/;
  const matchSymbol = englishRegex.test(searchValue);

  const { data: symbol } = useQuery(['symbol', searchValue], () => searchSymbol({ symbol: searchValue }), {
    enabled: matchSymbol && !Number(searchValue),
    retry: 0,
  });
  const { data: symbolNews } = useQuery(['news', searchValue], () => searchSymbolNews({ symbol: searchValue }), {
    enabled: matchSymbol && !Number(searchValue),
    retry: 0,
  });
  const { data: categoryNews } = useQuery(
    [Number(searchValue)],
    () => searchCategoryNews({ categoryId: Number(searchValue) }),
    {
      enabled: Number(searchValue) !== 0 && !isNaN(Number(searchValue)),
      select: (response) => {
        return response.data.data?.news;
      },
      retry: 0,
    },
  );

  const getSymbolValue = categoryNews && categoryNews.map((newsItem) => newsItem.symbol);
  console.log(getSymbolValue && getSymbolValue);
  if (getSymbolValue) {
    for (let i = 0; i < getSymbolValue.length; i++) {
      dispatch(setSearchKeywordData(getSymbolValue[i]));
    }
  }
  // const clickHandle = () => {
  //   console.log('dododo');
  // };

  if (!symbol) return null;
  if (!symbolNews) return null;

  const symbolSearchData = symbol && symbol.data && symbol.data.data;
  const symbolNewsData = symbolNews && symbolNews.data && symbolNews.data.data && symbolNews.data.data.news;

  return (
    <div>
      <div className="mb-[10px]">
        {symbolSearchData && symbolSearchData && <SymbolCardBar />}
        {symbolSearchData &&
          symbolSearchData.map((symbolItem: Symbol) => (
            <SymbolCard key={symbolItem.symbolId} symbolData={symbolItem} />
          ))}
      </div>
      {symbolNewsData && symbolNewsData && (
        <div className="mt-[10px] px-4 py-5 text-base font-extrabold">관련 뉴스</div>
      )}
      {symbolNewsData &&
        symbolNewsData.map((symbolNewsItem) => (
          <NewsCard cardDirection="row" key={symbolNewsItem.newsId} news={symbolNewsItem} />
        ))}
    </div>
  );
}
export default SearchPageContainer;
