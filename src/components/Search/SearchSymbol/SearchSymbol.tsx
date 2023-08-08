'use client';

import { useEffect, useRef } from 'react';
import { HttpStatusCode } from 'axios';
import { isMobile } from 'react-device-detect';
import { AppIcons } from '@/components/Icons';
import { searchSymbol } from '@/service/symbol';
import { type SearchedSymbol } from '@/interfaces/Symbol';

interface SearchSymbolProps {
  disabled?: boolean;
  submitWrapper?: HTMLDivElement | null;
  onSearch?: (symbols: SearchedSymbol[]) => void;
}

function SearchSymbol({ onSearch, disabled, submitWrapper }: SearchSymbolProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSearchingRef = useRef<boolean>(false);

  const headerRef = useRef<HTMLElement | null>(null);

  const handleSearchInputKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    await handleSubmit();
  };

  const handleFocus = () => {
    if (isMobile) {
      if (headerRef.current) {
        headerRef.current.style.position = 'sticky';
        headerRef.current.style.marginTop = '-52px';
      }

      if (submitWrapper) {
        submitWrapper.style.position = 'relative';
        submitWrapper.style.bottom = '0';
        submitWrapper.style.padding = '0';
      }
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      headerRef.current?.style.removeProperty('position');
      headerRef.current?.style.removeProperty('margin-top');

      setTimeout(() => {
        submitWrapper?.style.removeProperty('position');
        submitWrapper?.style.removeProperty('bottom');
        submitWrapper?.style.removeProperty('padding');
      }, 100);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isSearchingRef.current === true) return;
      if (!searchInputRef.current?.value) return;

      const { data: payload } = await searchSymbol({ symbol: searchInputRef.current?.value ?? '' });

      onSearch && onSearch(payload.status !== HttpStatusCode.Ok ? [] : payload.data ?? []);
    } catch (error) {
      onSearch && onSearch([]);
    } finally {
      isSearchingRef.current = false;
    }
  };

  useEffect(() => {
    headerRef.current = document.querySelector('header');

    return () => {
      if (isMobile) {
        headerRef.current?.style.removeProperty('sticky');
        headerRef.current?.style.removeProperty('margin-top');

        submitWrapper?.style.removeProperty('position');
        submitWrapper?.style.removeProperty('bottom');
        submitWrapper?.style.removeProperty('padding');
      }
    };
  }, []); /* eslint-disable-line */

  return (
    <div>
      <div
        className={`flex h-[46px] w-full items-center rounded-lg border border-[#454C52] bg-white px-4 py-3`}
        onKeyDown={handleSearchInputKeyDown}
      >
        <input
          ref={searchInputRef}
          disabled={disabled}
          className={`flex-1 border-none bg-white text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal`}
          placeholder="종목 검색"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="button" onClick={handleSubmit}>
          <AppIcons.Search />
        </button>
      </div>
    </div>
  );
}

export default SearchSymbol;
