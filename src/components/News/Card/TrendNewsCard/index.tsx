import SymbolChip from '@/components/UI/Chip/SymbolChip';
import NewsThumbnail, { NewsThumbnailLoading } from '@/components/Image/NewsThumbnail';
import Sentiment, { SentimentLoading } from '../Sentiment';
import NewsMeta, { NewsMetaLoading } from '../NewsMeta';
import NewsCardAction, { NewsCardActionLoading } from '../NewsCardAction';
import { type NewsData } from '@/interfaces/NewsData';

interface TrendNewsCardProps {
  news: NewsData;
}

export function TrendNewsCardLoading() {
  return (
    <article className="mx-auto max-w-2xl">
      <section className="mb-3.5">
        <NewsThumbnailLoading className={'mx-auto aspect-[16/10] !h-auto !w-full max-w-2xl !rounded-lg'} />
      </section>
      <section className="flex gap-4">
        <SentimentLoading />
        <section className="flex-1 space-y-[18px]">
          <NewsMetaLoading trendMeta />
          <section className="flex items-center justify-between">
            <SymbolChip loading />
            <NewsCardActionLoading />
          </section>
        </section>
      </section>
    </article>
  );
}

function TrendNewsCard({ news }: TrendNewsCardProps) {
  return (
    <article className="mx-auto max-w-2xl">
      <section className="mb-3.5">
        <NewsThumbnail
          src={news.thumbnail}
          className={'mx-auto aspect-[16/10] !h-auto !w-full max-w-2xl !rounded-lg'}
        />
      </section>
      <section className="flex gap-4">
        <Sentiment sentiment={news.sentiment} />
        <section className="flex-1 space-y-[18px]">
          <NewsMeta title={news.title} source={news.source} publishedDate={news.publishedDate} trendMeta />
          <section className="flex items-center justify-between">
            <SymbolChip
              // @ts-ignore
              symbol={{
                symbol: news.symbol,
                companyName: news.companyName,
                logo: news.logo,
              }}
            />
            <NewsCardAction newsId={news.newsId} bookmark={news.bookmark} symbolName={news.symbol} />
          </section>
        </section>
      </section>
    </article>
  );
}

export default TrendNewsCard;
