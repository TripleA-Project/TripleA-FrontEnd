'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchSymbol } from '@/service/symbol';
import { isSymbolKeyword } from '@/util/autocomplete';
import { SearchedSymbol } from '@/interfaces/Symbol';
import { NoResult } from './SearchResult';
import Link from 'next/link';
import SymbolLogoImage from '@/components/Image/SymbolLogoImage';

interface SymbolResultProps {
  keyword: string;
}

function SymbolResult({ keyword }: SymbolResultProps) {
  const { data: searchedSymbol, status } = useQuery(
    ['search', 'symbol', 'keyword', keyword],
    () => searchSymbol({ symbol: keyword! }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!keyword && isSymbolKeyword(keyword),
      select(response) {
        return response.data;
      },
    },
  );

  const [symbolList, setSymbolList] = useState<SearchedSymbol[] | null>(null);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (status !== 'success') return;

    if (searchedSymbol.data?.length) {
      setSymbolList(searchedSymbol.data);
    }

    setIsRender(true);
  }, [searchedSymbol, status]);

  if (status === 'loading') return null;
  if (status === 'error') return <NoResult />;

  return isRender ? (
    symbolList ? (
      <div className="box-border bg-white px-4 pt-4">
        <h2 className="font-bold">{keyword} 검색 결과</h2>
        <div className="divide-y-2 divide-[#F5F7F9]">
          {symbolList.map((symbol, index) => {
            return (
              <Link
                key={`${symbol.symbol}-${symbol.companyName}-${index}`}
                href={`/chart/symbol?name=${symbol.symbol.toUpperCase()}&resample=daily`}
                className="box-border flex items-center gap-4 p-4"
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
          })}
        </div>
      </div>
    ) : (
      <NoResult />
    )
  ) : null;
}

export default SymbolResult;
