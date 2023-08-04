import { getRelativeTime } from '@/util/getRelativeTime';
import { type NewsData } from '@/interfaces/NewsData';

interface NewsMetaLoadingProps {
  trendMeta?: boolean;
}

interface NewsMetaProps extends Pick<NewsData, 'title' | 'source' | 'publishedDate'> {
  trendMeta?: boolean;
}

export function NewsMetaLoading({ trendMeta }: NewsMetaLoadingProps) {
  return (
    <section className={`skeleton_loading ${trendMeta ? '' : 'card:max-w-[12.5rem]'}`}>
      <h3 className={`mb-1.5 max-w-full ${trendMeta ? 'h-6' : 'h-5 w-[22rem]'}`} />
      <p className={`flex gap-2 ![background:none] ${trendMeta ? 'h-5' : 'h-3.5'}`}>
        <span className={`${trendMeta ? 'h-5 w-12' : 'h-3.5 w-12'}`}></span>
        <span className={`${trendMeta ? 'h-5 w-12' : 'h-3.5 w-12'}`}></span>
      </p>
    </section>
  );
}

function NewsMeta({ title, source, publishedDate, trendMeta }: NewsMetaProps) {
  const convertSource = (source: string) => {
    const dotRemovedSource = source.replaceAll(/\..+/g, '');

    const firstUpper = dotRemovedSource.slice(0, 1).toUpperCase();
    const restString = dotRemovedSource.slice(1);

    return `[${firstUpper}${restString}]`;
  };

  return (
    <section className={`${trendMeta ? '' : 'card:max-w-[12.5rem]'}`}>
      <h3 className={`mb-1.5 line-clamp-2 font-semibold ${trendMeta ? 'text-base' : 'text-sm'}`}>{title}</h3>
      <p className={`flex gap-2 font-semibold text-[#777777] ${trendMeta ? 'text-xs' : 'text-[10px]'}`}>
        <span>{convertSource(source)}</span>
        <span>{getRelativeTime({ targetDate: publishedDate, pivotDate: new Date().toISOString() })}</span>
      </p>
    </section>
  );
}

export default NewsMeta;
