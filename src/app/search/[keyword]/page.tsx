import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import SearchHeader from '@/components/Layout/Header/SearchHeader';
import SearchResult from '@/components/Layout/Header/SearchHeader/SearchResult';

export const revalidate = 0;

interface SearchPageProps {
  params: {
    keyword?: string;
  };
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const keyword = params.keyword;

  return {
    title: keyword ? `검색: ${decodeURIComponent(keyword)}` : '검색',
    description: keyword ? `Triple A ${decodeURIComponent(keyword)} 검색 결과` : `Triple A 검색`,
  };
}

function Search({ params }: SearchPageProps) {
  const keyword = params.keyword;

  if (!keyword) redirect('/search');

  return (
    <>
      <SearchHeader keyword={decodeURIComponent(keyword)} />
      <div className="min-h-[calc(100vh-115px)] bg-[#F5F7F9]">
        {keyword ? <SearchResult keyword={decodeURIComponent(keyword)} /> : null}
      </div>
    </>
  );
}

export default Search;
