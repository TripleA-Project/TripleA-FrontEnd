import React, { Suspense } from 'react';
import { Metadata } from 'next';
import axios, { HttpStatusCode } from 'axios';
import NewsDetailLoading from '@/components/NewsDetail/Loading';
import NewsDetailFetcher from '@/components/NewsDetail/NewsDetailFetcher';
import NewsDetailHeader from '@/components/Layout/Header/NewsDetailHeader';
import Detail from '@/components/NewsDetail/Detail';
import NotFound from '@/components/NotFound';
import { getNewsById } from '@/service/news';

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

  if (data.thumbnail && data.thumbnail !== '' && data.thumbnail !== 'null') {
    try {
      const { status: thumbnailStatus } = await axios.get(data.thumbnail);

      if (thumbnailStatus === HttpStatusCode.Ok) {
        thumbnailURL = data.thumbnail;
      }
    } catch (e) {
      // 403 에러 등 에러가 발생할 경우에는
      // 기본 thumbnailURL 적용되면 되기때문에
      // 별도 에러처리를 하지 않아도 됨
    }
  }

  const title = status !== HttpStatusCode.Ok ? 'Triple A 뉴스 상세' : data.title;
  const siteUrl = `/detail/${params.id}${searchParams.symbol ? `?symbol=${searchParams.symbol.toUpperCase()}` : ''}`;
  const newsDescription = data.description ?? 'Triple A 뉴스 상세 페이지';

  return {
    title: `Triple A | 뉴스 상세`,
    description: `Triple A 뉴스 상세 페이지`,
    openGraph: {
      title,
      url: siteUrl,
      images: {
        url: thumbnailURL,
      },
      description: newsDescription,
    },
    twitter: {
      title,
      site: siteUrl,
      images: {
        url: thumbnailURL,
      },
      description: newsDescription,
    },
  };
}

async function DetailPage({ params, searchParams }: NewsDetailPageProps) {
  const id = params.id;
  const symbol = searchParams.symbol;
  const isInvalidPath = !params?.id || Number.isNaN(Number(params.id));

  if (isInvalidPath)
    return (
      <>
        <NewsDetailHeader />
        <NotFound />
      </>
    );

  return (
    <>
      <NewsDetailHeader />
      <Suspense fallback={<NewsDetailLoading />}>
        {/* @ts-expect-error server component */}
        <NewsDetailFetcher newsId={Number(id)} symbolName={symbol}>
          <Detail />
        </NewsDetailFetcher>
      </Suspense>
    </>
  );
}

export default DetailPage;
