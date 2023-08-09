import Sentiment, { SentimentLoading } from './Sentiment';
import NewsThumbnail, { NewsThumbnailLoading } from '@/components/Image/NewsThumbnail';
import NewsMeta, { NewsMetaLoading } from './NewsMeta';
import NewsCardAction, { NewsCardActionLoading } from './NewsCardAction';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { type NewsData } from '@/interfaces/NewsData';

interface NewsCardProps {
  news: NewsData;
  isLast?: boolean;
  onBookmark?: (newsId: number) => void;
}

export function NewsCardLoading({ isLast }: { isLast?: boolean }) {
  return (
    <article>
      <section className="mb-3.5">
        <SymbolChip loading />
      </section>
      <article className={`${isLast ? '' : 'border-b border-b-[#EEEEEE]'} box-border flex justify-between pb-4`}>
        <section className="flex gap-2">
          <SentimentLoading />
          <NewsThumbnailLoading />
          <NewsMetaLoading />
        </section>
        <NewsCardActionLoading />
      </article>
    </article>
  );
}

function NewsCard({ news, isLast, onBookmark }: NewsCardProps) {
  return (
    <article>
      <section className="mb-3.5">
        <SymbolChip
          // @ts-ignore
          symbol={{
            symbol: news.symbol,
            companyName: news.companyName,
            logo: news.logo,
          }}
        />
      </section>
      <article className={`${isLast ? '' : 'border-b border-b-[#EEEEEE]'} box-border flex justify-between pb-4`}>
        <section className="flex gap-2">
          <Sentiment sentiment={news.sentiment} />
          <NewsThumbnail src={news.thumbnail} />
          <NewsMeta title={news.title} source={news.source} publishedDate={news.publishedDate} />
        </section>
        <NewsCardAction
          newsId={news.newsId}
          symbolName={news.symbol}
          bookmark={news.bookmark}
          onBookmark={onBookmark}
        />
      </article>
    </article>
  );
}

export default NewsCard;

/*

  newsId : number;
  symbol: string;
  companyName: string;
  logo?:string;
  source: string;
  title: string;
  description: string;
  thumbnail?:string;
  publishedDate: string;
  sentiment:number;
  bookmark: {
    count: number;
    isBookmark: boolean;
  };


*/

/*

{
  "symbolId": 553095,
  "symbol": "AAPL",
  "companyName": "Apple Inc",
  "sector": null,
  "logo": "https://storage.googleapis.com/iex/api/logos/AAPL.png",
  "marketType": "NASDAQ"
}

*/
