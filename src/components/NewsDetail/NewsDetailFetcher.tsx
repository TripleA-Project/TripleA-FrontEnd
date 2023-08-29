import { cloneElement } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import Unauthorized from '../ErrorBoundary/ErrorFallback/NewsDetail/Unauthorized';
import InternalServerError from '../ErrorBoundary/ErrorFallback/common/InternalServerError';
import { getNewsDetail } from '@/service/news';
import { getSymbol } from '@/service/symbol';
import { checkNewsDetailApiError } from '@/util/handleApiError';
import { type NewsDetailResponse, type NewsDetailSymbol } from '@/interfaces/Dto/News';
import { type Symbol } from '@/interfaces/Symbol';
import { getProfile } from '@/service/user';

interface NewsDetailFetcherProps {
  newsId: number;
  symbolName?: string;
  children: React.ReactElement;
}

async function NewsDetailFetcher({ newsId, symbolName, children }: NewsDetailFetcherProps) {
  // detail
  const newsDetailResponse = await getNewsDetail({ id: newsId }).catch((err) => {
    return err as AxiosError;
  });

  const newsDetailApiError = checkNewsDetailApiError(newsDetailResponse);
  if (newsDetailApiError !== false) return newsDetailApiError;

  const newsDetailPayload = (newsDetailResponse as AxiosResponse<NewsDetailResponse>).data!.data!;

  // symbol
  const symbolResponse = await getSymbol({
    symbol: symbolName ?? newsDetailPayload?.symbol.name ?? '',
  }).catch((err) => {
    return err as AxiosError;
  });

  if (symbolResponse instanceof AxiosError) {
    return <InternalServerError />;
  }

  const symbolPayload = symbolResponse.data?.data;
  let requestSymbol: NewsDetailSymbol | undefined = undefined;

  if (typeof symbolPayload === 'string') {
    return <Unauthorized />;
  }

  if (Array.isArray(symbolPayload) && symbolPayload.length) {
    const { symbol, symbolId, ...targetSymbol } = symbolPayload[0] as Symbol;

    requestSymbol = {
      ...targetSymbol,
      name: symbol.toUpperCase(),
    } as NewsDetailSymbol;
  }

  const userResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });

  if (userResponse instanceof AxiosError) {
    return <InternalServerError />;
  }

  const userPayload = userResponse.data.data;

  const childComponent = cloneElement(children, {
    key: `newsDetailFetcherChildren`,
    newsDetailPayload,
    requestSymbol,
    user: userPayload,
  });

  return <>{childComponent}</>;
}

export default NewsDetailFetcher;
