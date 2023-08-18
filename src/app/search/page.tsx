import { Metadata } from 'next';
import SearchHeader from '@/components/Layout/Header/SearchHeader';
import Footer from '@/components/Layout/Footer';

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
      <Footer />
    </>
  );
}

export default Search;
