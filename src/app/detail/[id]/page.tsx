import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import axios, { HttpStatusCode } from 'axios';
import NewsDetail from '@/components/NewsDetail';
import NewsDetailHeader from '@/components/Layout/Header/NewsDetailHeader';
import { getNewsById } from '@/service/news';
import NotFound from '@/components/NotFound';
import { getSymbol } from '@/service/symbol';
import { type Symbol } from '@/interfaces/Symbol';
import { type NewsDetailSymbol } from '@/interfaces/Dto/News';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NewsDetailPageProps {
  params: { id: string };
  searchParams: {
    symbol: string;
  };
}

export async function generateMetadata({ params, searchParams }: NewsDetailPageProps): Promise<Metadata> {
  if (!params?.id || Number.isNaN(Number(params.id)))
    return {
      title: 'Triple A | 뉴스 상세',
      description: 'Triple A 뉴스 상세 페이지',
    };

  const { data, status } = await getNewsById({ id: Number(params.id) });

  let thumbnailURL = '/bgLogo.png';

  if (data.thumbnail && data.thumbnail !== '') {
    const { status: thumbnailStatus } = await axios.get(data.thumbnail);

    if (thumbnailStatus === HttpStatusCode.Ok) {
      thumbnailURL = data.thumbnail;
    }
  }

  return {
    title: `Triple A | 뉴스 상세`,
    description: `Triple A 뉴스 상세 페이지`,
    openGraph: {
      title: status !== HttpStatusCode.Ok ? 'Triple A 뉴스 상세' : data.title,
      url: `/detail/${params.id}${searchParams.symbol ? `?symbol=${searchParams.symbol.toUpperCase()}` : ''}`,
      images: {
        url: thumbnailURL,
      },
      description: data.description ?? 'Triple A 뉴스 상세 페이지',
    },
  };
}

async function Detail({ params, searchParams }: NewsDetailPageProps) {
  const id = params.id;
  const symbol = searchParams.symbol;
  const isInvalidPath = !params?.id || Number.isNaN(Number(params.id));

  let requestSymbol: NewsDetailSymbol | undefined = undefined;

  try {
    if (!isInvalidPath) {
      const matchedSymbol = await getSymbol({ symbol });

      if (matchedSymbol.data.status === HttpStatusCode.Unauthorized) {
        redirect(`/login?continueURL=/detail/${id}${symbol ? `?symbol=${symbol}` : ''}`);
      }

      if (matchedSymbol.data.data?.length) {
        const { symbol, symbolId, ...targetSymbol } = matchedSymbol.data.data[0] as Symbol;

        requestSymbol = {
          ...targetSymbol,
          name: symbol.toUpperCase(),
        } as NewsDetailSymbol;
      }
    }
  } catch (err) {}

  return (
    <>
      <NewsDetailHeader />
      {isInvalidPath ? <NotFound /> : <NewsDetail newsId={id} requestSymbol={requestSymbol} />}
    </>
  );
}

export default Detail;
