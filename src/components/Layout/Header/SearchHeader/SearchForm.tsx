'use client';

import { useState, useLayoutEffect } from 'react';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AutoComplete from './AutoComplete';
import { setRecentSearchLocalStorage } from '@/util/autocomplete';
import { AppIcons } from '@/components/Icons';

interface SearchFormProps {
  keyword: string;
}

interface SearchForm {
  keyword: string;
}

function SearchForm({ keyword }: SearchFormProps) {
  const { register, handleSubmit, getValues, setValue, setFocus } = useForm<SearchForm>({
    defaultValues: {
      keyword,
    },
  });

  const { push } = useRouter();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);

  const onValid = ({ keyword }: SearchForm) => {
    setRecentSearchLocalStorage(keyword);

    push(`/search/${encodeURIComponent(keyword)}`);
  };

  const handleChange = debounce((e: React.ChangeEvent<HTMLFormElement>) => {
    setSearchKeyword(getValues('keyword') ?? '');
    setIsSearchInputFocus(true);
  }, 400);

  const handleFocus = (e: React.FormEvent) => {
    const target = e.target as HTMLElement;

    const isSearchInput = target.tagName === 'INPUT';

    if (isSearchInput) {
      (target as HTMLInputElement).placeholder = '';

      setSearchKeyword(getValues('keyword') ?? '');
      setIsSearchInputFocus(true);
    }
  };

  useLayoutEffect(() => {
    setValue('keyword', keyword);
    setIsSearchInputFocus(false);
  }, [keyword]); /* eslint-disable-line */

  useLayoutEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isHeaderArea = !!target.closest('header');
      const isHistoryArea = !!target.closest('.search_history');

      if (!isHeaderArea && !isHistoryArea) {
        document.querySelector('input')!.placeholder = '종목/카테고리 검색';
        setIsSearchInputFocus(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <form
      id="search_form"
      className="flex w-full items-center"
      onSubmit={handleSubmit(onValid)}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={(e) => {
        if (e.key !== 'Enter') return;

        if (!getValues('keyword')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div className="ml-4 flex flex-1">
        <input
          {...register('keyword', { required: true })}
          autoComplete="off"
          spellCheck="false"
          placeholder="종목/카테고리 검색"
          className="-mb-1 box-border w-full font-bold outline-none placeholder:text-xl placeholder:font-medium placeholder:text-[#E2E6ED]"
        />
      </div>
      <AutoComplete keyword={searchKeyword} isFocus={isSearchInputFocus} />
      <button
        type="button"
        className="flex items-center justify-center"
        onClick={() => {
          setValue('keyword', '');
          setSearchKeyword('');
          setFocus('keyword');
        }}
      >
        <AppIcons.CloseFill.Gray className="!h-5 !w-5 shrink-0" />
      </button>
      <button form="search_form" type="submit" className="sr-only">
        검색
      </button>
    </form>
  );
}

export default SearchForm;
