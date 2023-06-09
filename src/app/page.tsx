import Header from '@/components/Header';
import NewsHomeWrapper from '@/components/Section/NewsHomeWrapper';
import { Metadata } from 'next';
// import Header from '@/components/Header';
// import Tabbar from '@/components/Tabbar';
// import InterestSection from '@/components/Section/InterestSection';
// import cardSlice from '@/redux/slice/cardSlice';
// import { useRouter } from 'next/router';

export const metadata: Metadata = {
  title: 'TripleA | 뉴스',
  description: 'Triple A 뉴스',
};

function Home() {
  return (
    <div className="min-h-[844px]">
      <Header leftIcon="LogoIcon" rightIcon="searchshort" />
      <div className="flex flex-col gap-[8px] bg-white pt-[27px]">
        <NewsHomeWrapper />
      </div>
    </div>
  );
}

export default Home;
