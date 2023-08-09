import dayjs from 'dayjs';
import NewsCardAction, { NewsCardActionLoading } from '../News/Card/NewsCardAction';
import { Bookmark } from '@/interfaces/NewsData';

interface NewsDetailMetaProps {
  newsId: number;
  symbolName?: string;
  bookmark: Bookmark;
  source: string;
  publishedDate: string;
}

export function NewsDetailMetaLoaing() {
  return (
    <section className="flex items-center justify-between">
      <section className="skeleton_loading">
        <span className="mr-0.5 inline-block h-4 w-10" />
        <span className="inline-block h-4 w-20" />
      </section>
      <NewsCardActionLoading />
    </section>
  );
}

function NewsDetailMeta({ newsId, symbolName, bookmark, source, publishedDate }: NewsDetailMetaProps) {
  const convertSource = (source: string) => {
    const dotRemovedSource = source.replaceAll(/\..+/g, '');

    const firstUpper = dotRemovedSource.slice(0, 1).toUpperCase();
    const restString = dotRemovedSource.slice(1);

    return `${firstUpper}${restString}`;
  };

  return (
    <section className="flex items-center justify-between">
      <section className="text-xs text-[#777777]">
        <span className="font-bold">{convertSource(source)} </span>
        <span className="font-semibold">{dayjs(publishedDate).format('YYYY.MM.DD HH:mm:ss')}</span>
      </section>
      <NewsCardAction showCount={false} newsId={newsId} symbolName={symbolName} bookmark={bookmark} />
    </section>
  );
}

export default NewsDetailMeta;
