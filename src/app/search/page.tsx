import { Metadata } from 'next';
import SearchHeader from '@/components/Layout/Header/SearchHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 검색',
  description: 'Triple A 검색',
};

function Search() {
  return (
    <>
      <SearchHeader />
    </>
  );
}

export default Search;
