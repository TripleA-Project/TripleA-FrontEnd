import { Metadata } from 'next';
import NewsHomeHeader from '@/components/Layout/Header/NewsHomeHeader';
import LatestNewsPage from '@/components/News/LatestNewsPage';
import NewsTab, { MainPageNewsTab } from '@/components/News/NewsTab';
import InterestNewsPage from '@/components/News/InterestNews/InterestNewsPage';
import NotFound from '@/components/NotFound';
import { ToastContainer } from 'react-toastify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomeProps {
  searchParams: {
    [key: string]: string;
    tab: string;
  };
}

export const metadata: Metadata = {
  title: 'TripleA | 뉴스',
  description: 'Triple A 뉴스',
};

const MainPageTabs: MainPageNewsTab[] = ['latestNews', 'interestNews'];

function Home({ searchParams }: HomeProps) {
  const tab = searchParams.tab || 'latestNews';

  if (!MainPageTabs.includes(tab as any)) {
    return (
      <div className="box-border bg-white px-4">
        <NewsHomeHeader isLikeNewsPage={!!(tab === 'interestNews')} />
        <section className="my-5">
          <NotFound />
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="box-border bg-white px-4">
        <NewsHomeHeader isLikeNewsPage={!!(tab === 'interestNews')} />
        <section className="my-5">
          <NewsTab />
        </section>
        {(tab as MainPageNewsTab) === 'latestNews' ? <LatestNewsPage /> : <InterestNewsPage />}
        <ToastContainer position="bottom-center" newestOnTop={true} />
      </div>
    </>
  );
}
export default Home;
