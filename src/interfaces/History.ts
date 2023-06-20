interface News {
  id: number;
  deleted: boolean;
}

interface Bookmark {
  count: number;
  news: News[];
}

interface History {
  count: number;
  news: Omit<News, 'deleted'>[];
}

export interface NewsHistory {
  date: string;
  bookmark: Bookmark;
  history: History;
}
