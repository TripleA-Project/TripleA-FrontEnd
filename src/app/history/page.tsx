import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import HistoryHeader from '@/components/Layout/Header/HistoryHeader';
import HistoryPage from '@/components/HistoryPage';
import HistoryInitialFetcher from '@/components/HistoryPage/HistoryInitialFetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 내가 본 뉴스',
  description: 'Triple A 내가 본 뉴스페이지',
};

function HistoryNewsPage() {
  console.log('isServer: ', typeof window === 'undefined');
  console.log('refresh cookie: ', cookies().get('refreshToken'));

  return (
    <>
      <HistoryHeader />
      <div className="box-border px-4">
        <Suspense fallback={<></>}>
          {/* @ts-expect-error server component */}
          <HistoryInitialFetcher>
            <HistoryPage />
          </HistoryInitialFetcher>
        </Suspense>
      </div>
    </>
  );
}

export default HistoryNewsPage;
