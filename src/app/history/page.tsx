import HistoryPage from '@/components/HistoryPage';
import HistoryHeader from '@/components/Layout/Header/HistoryHeader';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 내가 본 뉴스',
  description: 'Triple A 내가 본 뉴스페이지',
};

function HistoryNewsPage() {
  return (
    <>
      <HistoryHeader />
      <div className="box-border px-4">
        <HistoryPage />
      </div>
    </>
  );
}

export default HistoryNewsPage;
