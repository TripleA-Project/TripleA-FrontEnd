import Header from '@/components/Header';
import SearchPageContainer from '@/components/SearchPageContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색',
  description: 'Triple A 검색',
};

function Search() {
  return (
    <div className="bg-[#FFFFFF]">
      <Header leftIcon="arrowleft" rightIcon="x" pathName="/search" />
      <SearchPageContainer />
    </div>
  );
}

export default Search;
