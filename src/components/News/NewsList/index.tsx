import Link from 'next/link';
import NewsCard, { NewsCardLoading } from '../Card';
import { type NewsData } from '@/interfaces/NewsData';

interface LoadingProps {
  length?: number;
}

interface NewsListProps {
  newsList: NewsData[];
  onBookmark?: (newsId: number) => void;
}

export function NewsListLoading({ length = 10 }: LoadingProps) {
  return (
    <section className="flex flex-col gap-4">
      {Array.from({ length }).map((_, idx) => {
        return <NewsCardLoading key={`${Date.now()}-${idx}`} isLast={idx === length - 1} />;
      })}
    </section>
  );
}

function NewsList({ newsList, onBookmark }: NewsListProps) {
  return (
    <section className="flex flex-col gap-4">
      {newsList?.map((news, idx) => {
        return (
          <Link
            key={`${news.newsId}-${news.symbol}-${idx}`}
            href={`/detail/${news.newsId}${news.symbol ? `?symbol=${news.symbol.toUpperCase()}` : ''}`}
          >
            <NewsCard news={news} isLast={idx === newsList.length - 1} onBookmark={onBookmark} />
          </Link>
        );
      })}
    </section>
  );
}

export default NewsList;
