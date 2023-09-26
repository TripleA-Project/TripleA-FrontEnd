'use client';

import { searchSymbolNews } from '@/service/news';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import NewsList from '../NewsList';

interface SymbolShortNewsProps {
  symbol: string;
}

function SymbolShortNews({ symbol }: SymbolShortNewsProps) {
  const { data: symbolShortNews } = useQuery(
    ['symbol', 'news', 'short', symbol.toUpperCase()],
    () => searchSymbolNews({ symbol, size: 3 }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      suspense: true,
      select(response) {
        return response.data.data?.news;
      },
    },
  );

  if (!symbolShortNews?.length) return <>관련 기사가 없습니다</>;

  return <NewsList newsList={symbolShortNews} />;
}

export default SymbolShortNews;
