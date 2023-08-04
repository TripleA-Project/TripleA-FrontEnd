import Link from 'next/link';
import NewsGridCard, { NewsGridCardLoading } from '../Card/Grid/NewsGridCard';
import { type NewsData } from '@/interfaces/NewsData';

interface NewsGridListProps {
  newsList: NewsData[];
}

interface LoadingProps {
  gridItemLength?: number;
}

export function NewsGridListLoading({ gridItemLength = 10 }: LoadingProps) {
  return (
    <>
      {Array.from({ length: gridItemLength }).map((_, idx) => {
        return <NewsGridCardLoading key={`grid-${Date.now()}-${idx}`} />;
      })}
    </>
  );
}

function NewsGridList({ newsList }: NewsGridListProps) {
  return (
    <>
      {newsList?.map((news) => {
        return (
          <Link
            key={`grid-${news.newsId}-${news.symbol}`}
            href={`/detail/${news.newsId}${news.symbol ? `?symbol=${news.symbol.toUpperCase()}` : ''}`}
          >
            <NewsGridCard news={news} />
          </Link>
        );
      })}
    </>
  );
}

export default NewsGridList;
