'use client';
import Header from '@/components/Header';
import { Metadata } from 'next';
import { FocusEvent, useRef, useState } from 'react';

export const metadata: Metadata = {
  title: '검색',
  description: 'Triple A 검색',
};

function Search() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isBlured, setIsBlured] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusHandle = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(!isFocused);
  };

  const inputHandle = () => {
    if (searchInputRef.current) {
      console.log(searchInputRef.current.value);
    }
  };

  return (
    <div>
      <Header leftIcon="arrowleft" rightIcon="x" />
    </div>
  );
}

export default Search;
