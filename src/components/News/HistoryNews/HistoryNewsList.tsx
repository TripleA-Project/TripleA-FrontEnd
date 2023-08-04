'use client'

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { cloneDeep } from 'lodash';
import { UseQueryResult, useQueries, useQueryClient } from '@tanstack/react-query';
import NewsList, { NewsListLoading } from '../NewsList';
import { AppIcons } from '@/components/Icons';
import { getNewsById } from '@/service/news';
import { type NewsData } from '@/interfaces/NewsData';
import { type NewsHistory } from '@/interfaces/History';
import { type CalenderDate } from '@/components/Calendar/MuiCalendar';

dayjs.extend(isBetween);

interface HistoryNews {
  date: string;
  newsList: NewsData[];
}

export interface HistoryNewsFilter {
  order?: 'descending' | 'ascending';
  bookmark?: boolean;
}

interface HistoryNewsListProps {
  historyList: NewsHistory[];
  targetDate: CalenderDate;
  filter?: HistoryNewsFilter;
}

function getRenderNewsList(newsList: HistoryNews[], filter: HistoryNewsFilter) {
  if (!newsList?.length) return newsList;

  const list = cloneDeep(newsList);

  if (filter.order) {
    list.sort((a, b) => {
      return filter.order === 'descending' ? dayjs(b.date).diff(dayjs(a.date)) : dayjs(a.date).diff(dayjs(b.date));
    });
  }

  if (filter.bookmark) {
    list.map((source) => {
      const bookmarkedNews = source.newsList.filter((news) => news.bookmark.isBookmark);
      source.newsList = [...bookmarkedNews];

      return source;
    });
  }

  return list;
}

function getTargetHistory(historyList: NewsHistory[], targetDate: CalenderDate) {
  return historyList.length
    ? historyList?.filter((history) => {
        const date = dayjs(history.date);

        return date.isBetween(targetDate.startDate, targetDate.endDate ?? targetDate.startDate, 'day', '[]');
      })
    : [];
}

function getFetchNewsIdList(historyList: NewsHistory[]) {
  return historyList?.flatMap((history) => history.history.news).map(({ id }) => id);
}

export function getQueriesStatus<T = any, E = unknown>(
  queries: UseQueryResult<T, E>[],
): 'loading' | 'success' | 'error' {
  if (queries.some((query) => query.status === 'error')) return 'error';
  if (queries.some((query) => query.status === 'loading')) return 'loading';
  if (queries.every((query) => query.status === 'success')) return 'success';

  return 'loading';
}

function HistoryNewsList({
  historyList,
  targetDate,
  filter = {
    order: 'descending',
    bookmark: false,
  },
}: HistoryNewsListProps) {
  const queryClient = useQueryClient();

  const [historyNewsSource, setHistoryNewsSource] = useState<HistoryNews[]>([]);

  const fetchIdList = getFetchNewsIdList(getTargetHistory(historyList, targetDate));

  const newsListQueries = useQueries({
    queries: fetchIdList?.length
      ? fetchIdList.map((newsId) => {
          return {
            queryFn: () => {
              return getNewsById({ id: newsId });
            },
            queryKey: ['history', newsId],
            retry: 0,
            refetchOnWindowFocus: false
          };
        })
      : [],
  });

  const queriesStatus = getQueriesStatus(newsListQueries);

  useEffect(() => {
    if (queriesStatus !== 'success') return;

    const targetHistoryList = getTargetHistory(historyList, targetDate);
    const targetHistoryDateList = targetHistoryList.map(targetHistory => targetHistory.date)
    
    if (historyNewsSource.length === targetHistoryList.length && historyNewsSource.every(historyNews => targetHistoryDateList.find(targetHistoryDate => dayjs(targetHistoryDate).format('YYYY-MM-DD') === dayjs(historyNews.date).format('YYYY-MM-DD')) )) return;
    
    if (fetchIdList?.length) {
      const newsListSource = targetHistoryList.map((history) => {
        const news = history.history.news;

        const newsDataList = news.map(({ id }) => {
          const newsQuery = newsListQueries.find(({ data: payload }) => payload?.data!.id === id);

          const { title, description, source, sentiment, publishedDate, symbol, thumbnail } = newsQuery?.data?.data!;

          return {
            newsId: id,
            title,
            description,
            source,
            sentiment,
            publishedDate,
            symbol,
            companyName: '',
            logo: `https://storage.googleapis.com/iex/api/logos/${symbol.toUpperCase()}.png`,
            thumbnail,
            bookmark: {
              count: 0,
              isBookmark: !!history.bookmark.news.find((bookmark) => {
                return bookmark.id === id && !bookmark.deleted;
              }),
            },
          } as NewsData;
        });

        return {
          date: history.date,
          newsList: newsDataList,
        } as HistoryNews;
      });

      setHistoryNewsSource(newsListSource);
    }
  }, [queriesStatus, fetchIdList]); /* eslint-disable-line */

  if (queriesStatus === 'loading') return <NewsListLoading length={3} />;

  if (queriesStatus === 'error') return <>에러</>;

  if (!fetchIdList?.length || !historyNewsSource?.length) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <AppIcons.Message />
        <p className="text-[#9AA2A9]">검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <NewsList
      newsList={
        historyNewsSource ? getRenderNewsList(historyNewsSource, filter).flatMap((source) => source.newsList) : []
      }
      onBookmark={(newsId) => {
        queryClient.invalidateQueries([
          'history',
          targetDate.selectedDate?.format('YYYY-MM-DD'),
          targetDate.startDate?.format('YYYY-MM-DD'),
          targetDate.endDate?.format('YYYY-MM-DD'),
        ],)
      }}
    />
  );
}

export default HistoryNewsList;
