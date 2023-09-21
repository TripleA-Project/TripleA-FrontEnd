'use client';

import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { HttpStatusCode } from 'axios';
import { isMobile } from 'react-device-detect';
import { AppIcons } from '@/components/Icons';
import WaitSearchLinearProgress from '@/components/UI/Progress/WaitSearchLinearProgress';
import { searchSymbol } from '@/service/symbol';
import { useTimer } from '@/hooks/useTimer';
import type { SearchedSymbol } from '@/interfaces/Symbol';

interface SearchSymbolProps {
  disabled?: boolean;
  submitWrapper?: HTMLDivElement | null;
  onSearch?: (symbols: SearchedSymbol[]) => void;
}

function SearchSymbol({ onSearch, disabled, submitWrapper }: SearchSymbolProps) {
  const { time, timerStart, timerStop, timerReset } = useTimer({ initialTime: { second: 10 } });

  const searchWaitingTime = 10 - time;

  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSearchingRef = useRef<boolean>(false);

  const headerRef = useRef<HTMLElement | null>(null);

  const debounceChangeHandler = debounce(async (e: React.ChangeEvent) => {
    if (isSearchingRef.current === true) return;

    if (!searchInputRef.current?.value) {
      onSearch && onSearch([]);

      return;
    }

    await handleSubmit();
  }, 400);

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

      if (!searchInputRef.current?.value) {
        return;
      }

      isSearchingRef.current = true;

      timerStart();

      const { data: payload } = await searchSymbol({ symbol: searchInputRef.current?.value ?? '' });

      onSearch && onSearch(payload.status !== HttpStatusCode.Ok ? [] : payload.data ?? []);
    } catch (error) {
      onSearch && onSearch([]);
    } finally {
      isSearchingRef.current = false;

      timerStop();
      timerReset();
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
    <div className="relative">
      <div
        className={`flex h-[46px] w-full items-center rounded-lg border border-[#454C52] bg-white px-4 py-3`}
        onKeyDown={handleSearchInputKeyDown}
      >
        <input
          ref={searchInputRef}
          className={`flex-1 border-none bg-white text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal`}
          placeholder="종목 검색"
          spellCheck="false"
          disabled={disabled}
          onChange={debounceChangeHandler}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="button" onClick={handleSubmit}>
          <AppIcons.Search />
        </button>
      </div>
      <div className="absolute -bottom-4 w-full">
        {searchWaitingTime >= 3 && isSearchingRef.current === true ? <WaitSearchLinearProgress /> : null}
      </div>
    </div>
  );
}

export default SearchSymbol;
