'use client';

import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import NewsCardAction from '../News/Card/NewsCardAction';
import { type Bookmark } from '@/interfaces/NewsData';

interface NewsDetailMetaProps {
  newsId: number;
  symbolName?: string;
  bookmark: Bookmark;
  source: string;
  publishedDate: string;
}

function NewsDetailMeta({ newsId, symbolName, bookmark, source, publishedDate }: NewsDetailMetaProps) {
  const queryClient = useQueryClient();

  const convertSource = (source: string) => {
    const dotRemovedSource = source.replaceAll(/\..+/g, '');

    const firstUpper = dotRemovedSource.slice(0, 1).toUpperCase();
    const restString = dotRemovedSource.slice(1);

    return `${firstUpper}${restString}`;
  };

  return (
    <>
      <section className="flex items-center justify-between">
        <section className="text-xs text-[#777777]">
          <span className="font-bold">{convertSource(source)} </span>
          <span className="font-semibold">{dayjs(publishedDate).format('YYYY.MM.DD HH:mm:ss')}</span>
        </section>
        <NewsCardAction
          showCount={false}
          newsId={newsId}
          symbolName={symbolName}
          bookmark={bookmark}
          onBookmark={(newsId) => {
            queryClient.invalidateQueries(['news', 'detail', newsId]);
          }}
        />
      </section>
    </>
  );
}

export default NewsDetailMeta;
