import NewsList, { NewsListLoading } from '../NewsList';
import NewsGridList, { NewsGridListLoading } from '../NewsList/NewsGridList';
import { type NewsView } from './ViewFilter';
import { type NewsData } from '@/interfaces/NewsData';

interface LatestNewsListProps {
  newsList: NewsData[];
  view: NewsView;
}

interface LoadingProps {
  listLength?: number;
  gridItemLength?: number;
  view: NewsView;
}

export function LatestNewsListLoading({ view, listLength = 10, gridItemLength = 10 }: LoadingProps) {
  return view === 'box' ? (
    <NewsListLoading length={listLength} />
  ) : (
    <NewsGridListLoading gridItemLength={gridItemLength} />
  );
}

function LatestNewsList({ newsList, view }: LatestNewsListProps) {
  return view === 'box' ? <NewsList newsList={newsList} /> : <NewsGridList newsList={newsList} />;
}

export default LatestNewsList;
