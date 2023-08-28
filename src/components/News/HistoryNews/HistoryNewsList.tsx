'use client';

import NewsList from '../NewsList';
import HistoryNewsNotFound from '@/components/ErrorBoundary/ErrorFallback/History/HistoryNewsNotFound';
import { getRenderNewsList } from '@/components/HistoryPage/helper/historyNewsUtil';
import { revalidateHistory } from '@/components/HistoryPage/helper/revalidate';
import { type HistoryNews } from '@/interfaces/History';

export interface HistoryNewsFilter {
  order?: 'descending' | 'ascending';
  bookmark?: boolean;
}

interface HistoryNewsListProps {
  historyNewsListSource?: HistoryNews[];
  filter?: HistoryNewsFilter;
}

function HistoryNewsList({
  historyNewsListSource,
  filter = {
    order: 'descending',
    bookmark: false,
  },
}: HistoryNewsListProps) {
  const newsList = historyNewsListSource ? getRenderNewsList(historyNewsListSource, filter) : [];

  if (!newsList?.length) return <HistoryNewsNotFound />;

  return (
    <NewsList
      newsList={newsList}
      onBookmark={(newsId) => {
        revalidateHistory();
      }}
    />
  );
}

export default HistoryNewsList;
