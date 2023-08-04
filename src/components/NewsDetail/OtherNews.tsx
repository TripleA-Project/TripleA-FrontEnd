'use client';

import { useQuery } from '@tanstack/react-query';
import NewsList, { NewsListLoading } from '../News/NewsList';
import { searchCategoryNews } from '@/service/news';
import { type Category } from '@/interfaces/Category';

interface OtherNewsProps {
  currentNewsId: number;
  category: Category;
}

function OtherNews({ currentNewsId, category }: OtherNewsProps) {
  const { data: OtherNewsListPayload, status } = useQuery(
    ['category', 'news', category.category],
    () => searchCategoryNews({ categoryId: category.categoryId }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  return status === 'loading' ? (
    <NewsListLoading length={3} />
  ) : (
    <NewsList
      newsList={OtherNewsListPayload?.data?.news?.filter((news) => news.newsId !== currentNewsId)?.slice(0, 3) ?? []}
    />
  );
}

export default OtherNews;
