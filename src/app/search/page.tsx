import { Metadata } from 'next';
import SearchHeader from '@/components/Layout/Header/SearchHeader';

export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    keyword?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const keyword = searchParams.keyword;

  return {
    title: keyword ? `Triple A | 검색: ${keyword}` : 'Triple A | 검색',
    description: keyword ? `Triple A ${keyword} 검색 결과` : `Triple A 검색`,
  };
}

function Search({ searchParams }: SearchPageProps) {
  const keyword = searchParams.keyword;

  return (
    <>
      <SearchHeader keyword={keyword} />
    </>
  );
}

export default Search;
