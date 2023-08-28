import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { cloneDeep, uniqBy } from 'lodash';
import { type AxiosResponse } from 'axios';
import { type UseQueryResult } from '@tanstack/react-query';
import { type CalenderDate } from '@/components/Calendar/MuiCalendar';
import { News, type HistoryNews, type NewsHistory } from '@/interfaces/History';
import { type GetNewsByIdResponse } from '@/interfaces/Dto/News';
import { type NewsData } from '@/interfaces/NewsData';
import { type HistoryNewsFilter } from '@/components/News/HistoryNews/HistoryNewsList';

dayjs.extend(isBetween);

export function getBookmarks(historyList: NewsHistory[]) {
  if (!historyList.length) return [] as News[];

  const resultBookmarkList = [] as News[];

  historyList
    .flatMap((history) => history.bookmark.news)
    .forEach((bookmarkHistory) => {
      const existIndex = resultBookmarkList.findIndex(
        (resultBookmarkNews) => resultBookmarkNews.id === bookmarkHistory.id,
      );
      if (existIndex > -1) {
        resultBookmarkList[existIndex] = bookmarkHistory;

        return;
      }
      resultBookmarkList.push(bookmarkHistory);
    });

  return resultBookmarkList.filter((bookmark) => !bookmark.deleted);
}

export function getTargetHistory(historyList: NewsHistory[], targetDate: CalenderDate) {
  return historyList.length
    ? historyList?.filter((history) => {
        const date = dayjs(history.date);

        return date.isBetween(targetDate.startDate, targetDate.endDate ?? targetDate.startDate, 'day', '[]');
      })
    : [];
}

export function getFetchNewsIdList(historyList: NewsHistory[], targetDate: CalenderDate) {
  const targetHistoryList = getTargetHistory(historyList, targetDate);

  return targetHistoryList.flatMap((history) => history.history.news).map(({ id }) => id);
}

export function createHistoryNewsList({
  historyList,
  targetDate,
  newsListQueries,
}: {
  historyList: NewsHistory[];
  targetDate: CalenderDate;
  newsListQueries: UseQueryResult<AxiosResponse<GetNewsByIdResponse, any>, unknown>[];
}) {
  const targetHistoryList = getTargetHistory(historyList, targetDate);

  const bookmarks = getBookmarks(historyList);

  const newsListSource = targetHistoryList.map((history) => {
    const news = history.history.news;

    const newsDataList = news.map(({ id }) => {
      const newsQuery = newsListQueries.find(({ data: payload }) => payload?.data.id === id);

      if (!newsQuery?.data?.data) return null;

      const { title, description, source, sentiment, publishedDate, symbol, thumbnail } = newsQuery?.data?.data;

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
          isBookmark: bookmarks.some((bookmark) => bookmark.id === id),
        },
      } as NewsData;
    });

    return {
      date: history.date,
      newsList: newsDataList.filter((news) => news !== null),
    } as HistoryNews;
  });

  return newsListSource;
}

export function getRenderNewsList(newsList: HistoryNews[], filter: HistoryNewsFilter) {
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

  return filter.order === 'descending'
    ? uniqBy(
        list.flatMap((source) => source.newsList),
        'newsId',
      )
    : uniqBy(list.flatMap((source) => source.newsList).reverse(), 'newsId').reverse();
}

export function getQueriesStatus<T = any, E = unknown>(
  queries: UseQueryResult<T, E>[],
): 'loading' | 'success' | 'error' {
  if (queries.some((query) => query.status === 'error')) return 'error';
  if (queries.some((query) => query.status === 'loading')) return 'loading';
  if (queries.every((query) => query.status === 'success')) return 'success';

  return 'loading';
}
