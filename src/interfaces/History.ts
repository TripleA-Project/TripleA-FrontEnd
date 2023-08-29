import { type NewsData } from './NewsData';

export interface News {
  id: number;
  deleted: boolean;
}

interface Bookmark {
  count: number;
  news: News[];
}

interface History {
  count: number;
  news: Pick<News, 'id'>[];
}

export interface NewsHistory {
  date: string;
  bookmark: Bookmark;
  history: History;
}

export interface HistoryNews {
  date: string;
  newsList: NewsData[];
}
