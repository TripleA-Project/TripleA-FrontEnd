import { Metadata } from 'next';
import { Suspense } from 'react';
import HistoryHeader from '@/components/Layout/Header/HistoryHeader';
import HistoryPage from '@/components/HistoryPage';
import HistoryInitialFetcher from '@/components/HistoryPage/HistoryInitialFetcher';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 내가 본 뉴스',
  description: 'Triple A 내가 본 뉴스페이지',
};

interface HistoryNewsPageProps {
  searchParams: {
    year?: string;
    month?: string;
  };
}

function HistoryNewsPage({ searchParams }: HistoryNewsPageProps) {
  const year = searchParams.year;
  const month = searchParams.month;

  if (!year || !month) {
    const today = dayjs();

    redirect(`/history?year=${today.get('years')}&month=${today.get('month') + 1}`);
  }

  return (
    <>
      <HistoryHeader />
      <div className="box-border px-4">
        <Suspense fallback={<></>}>
          {/* @ts-expect-error server component */}
          <HistoryInitialFetcher year={year} month={month}>
            <HistoryPage year={Number(year)} month={Number(month)} />
          </HistoryInitialFetcher>
        </Suspense>
      </div>
    </>
  );
}

export default HistoryNewsPage;
