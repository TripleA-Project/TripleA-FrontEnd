'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  deleteRecentSearchLocalStorage,
  getRecentSearchLocalStorage,
  isEng,
  isKor,
  setRecentSearchLocalStorage,
} from '@/util/autocomplete';
import { IoCloseOutline } from 'react-icons/io5';

function RecentSearch() {
  const [history, setHistory] = useState<string[]>(getRecentSearchLocalStorage() ?? []);

  return (
    <>
      <div className="box-border flex h-12 w-full items-center justify-between px-4 py-3 ">
        <span className="text-sm font-medium text-[#4E525D]">최근 검색어</span>
        <button
          type="button"
          className="text-sm font-medium text-[#9AA1A9]"
          onClick={() => {
            deleteRecentSearchLocalStorage();

            setHistory(getRecentSearchLocalStorage() ?? []);
          }}
        >
          전체 삭제
        </button>
      </div>
      {!history.length ? (
        <div className="flex h-[125px] items-center justify-center text-sm font-semibold text-[#131F3C]">
          최근 검색 내역이 없습니다.
        </div>
      ) : (
        history.map((keyword, idx) => {
          return (
            <Link
              key={`${keyword}-${idx}`}
              href={
                isKor(keyword) || !isEng(keyword)
                  ? `/search/${encodeURIComponent(keyword)}`
                  : `/chart/symbol?name=${keyword.toUpperCase()}&resample=daily`
              }
              onClick={() => {
                setRecentSearchLocalStorage(keyword);
              }}
            >
              <div className="search_history box-border flex h-[58px] items-center gap-5 p-4">
                <span className="flex-1 text-[#131F3C]">{keyword}</span>
                <button
                  type="button"
                  className="flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    deleteRecentSearchLocalStorage(idx);

                    setHistory(getRecentSearchLocalStorage() ?? []);
                  }}
                >
                  <IoCloseOutline className="shrink-0 text-xl text-[#131F3C]" />
                </button>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
}

export default RecentSearch;
