'use client';

import { useRef } from 'react';
import { debounce } from 'lodash';
import { isMobile } from 'react-device-detect';
import { AppIcons } from '@/components/Icons';
import { searchCategory } from '@/service/category';
import { type Category } from '@/interfaces/Category';

interface SearchCategoryProps {
  onSearch?: (categories: Category[]) => void;
}

function SearchCategory({ onSearch }: SearchCategoryProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSearchingRef = useRef<boolean>(false);

  const debounceChangeHandler = debounce(async (e: React.ChangeEvent) => {
    try {
      if (isSearchingRef.current === true) return;

      if (!searchInputRef.current?.value) {
        isSearchingRef.current = true;

        onSearch && onSearch([]);

        return;
      }

      await handleSubmit();
    } catch (error) {
      onSearch && onSearch([]);
    } finally {
      isSearchingRef.current = false;
    }
  }, 400);

  const handleSearchInputKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    await handleSubmit();
  };

  const handleFocus = () => {
    if (isMobile) {
      document.documentElement.style.minHeight = window.screen.height + 'px';
      document.body.style.minHeight = window.screen.height + 'px';
      document.body.classList.add('translate-y-0', '-mt-[52px]');

      document.querySelector('header')!.style.position = 'sticky';
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      document.body.classList.remove('-mt-[52px]');
      document.querySelector('header')!.style.removeProperty('position');

      setTimeout(() => {
        document.documentElement.style.removeProperty('min-height');
        document.body.style.removeProperty('min-height');
        document.body.classList.remove('translate-y-0');
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

      const { data: payload } = await searchCategory({ search: searchInputRef.current?.value ?? '' });

      onSearch && onSearch(payload.data ?? []);
    } catch (error) {
      onSearch && onSearch([]);
    } finally {
      isSearchingRef.current = false;
    }
  };

  return (
    <div>
      <div
        className={`flex h-[46px] w-full items-center rounded-lg border border-[#454C52] bg-white px-4 py-3`}
        onKeyDown={handleSearchInputKeyDown}
      >
        <input
          ref={searchInputRef}
          className={`flex-1 border-none text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal`}
          placeholder="카테고리 검색"
          onChange={debounceChangeHandler}
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

export default SearchCategory;
