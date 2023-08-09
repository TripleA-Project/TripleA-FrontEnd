import { Metadata } from 'next';
import NewsHomeHeader from '@/components/Layout/Header/NewsHomeHeader';
import LatestNewsPage from '@/components/News/LatestNewsPage';
import NewsTab from '@/components/News/NewsTab';
import InterestNewsPage from '@/components/News/InterestNews/InterestNewsPage';
import NotFound from '@/components/NotFound';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

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

async function Home({ searchParams }: HomeProps) {
  return (
    <div className="box-border bg-white px-4">
      <NewsHomeHeader isLikeNewsPage={!!searchParams.tab && searchParams.tab === 'interest'} />
      <section className="my-5">
        <NewsTab />
      </section>
      {searchParams?.tab ? searchParams.tab === 'interest' ? <InterestNewsPage /> : <NotFound /> : <LatestNewsPage />}
    </div>
  );
}
export default Home;
