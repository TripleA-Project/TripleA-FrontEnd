'use client';
// import { SearchSymbolResponse } from '@/interfaces/Dto/Symbol';
import React, { useEffect } from 'react';

// interface SearchResultsListProps {
//   symbolData: SearchSymbolResponse;
//   onSelect: (value: string) => void;
// }

function SearchSymbolResultsList({ symbolData, onSelect }: any) {
  useEffect(() => {}, [symbolData.symbol]);
  if (!symbolData) {
    return null;
  }
  const selectHandle = () => {
    onSelect(symbolData.symbol);
  };

  return (
    <li key={symbolData.symbolId} className="p-4" onClick={selectHandle}>
      {symbolData.symbol}
    </li>
  );
}

export default SearchSymbolResultsList;
