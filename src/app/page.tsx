// import Header from '@/components/Header';
// import Tabbar from '@/components/Tabbar';
import Header from '@/components/Header';
import NewsHomeWrapper from '@/components/Section/NewsHomeWrapper';
import { Metadata } from 'next';

// import InterestSection from '@/components/Section/InterestSection';
// import cardSlice from '@/redux/slice/cardSlice';
// import { useRouter } from 'next/router';

export const metadata: Metadata = {
  title: 'TripleA | 뉴스',
  description: 'Triple A 뉴스',
};

function Home() {
<<<<<<< HEAD
  return( 
  <div>
    <Modal size={'small'} title={<>오늘 열람 가능한 횟수<br/>2회 남았어요!</>} content={<></>} mainBtn={'구독하고 무제한으로 보기'} subBtn={'구독 없이 계속 보기'}/>
    <Modal size={'big'} title={<><div>d</div><div>오늘 열람 가능한 횟수를<br/>모두 사용했어요</div></>} content={<>구독 후 번역&요약 글, 감성분석,<br/>키워드, AI분석을 확인할 수 있어요!</>} mainBtn={'구독하러 가기'} subBtn={''}/>
    <CardNews newsId={news.newsId} symbol={news.symbol} source={news.source} title={news.title} description={news.description} thumbnail={news.thumbnail} publishedDate={news.publishedDate} sentiment={news.sentiment} bookmark={news.bookmark} cardDirection=''/>  
    <CardNews newsId={news.newsId} symbol={news.symbol} source={news.source} title={news.title} description={news.description} thumbnail={news.thumbnail} publishedDate={news.publishedDate} sentiment={news.sentiment} bookmark={news.bookmark} cardDirection=''/>  
  </div>
    )
=======
  return (
    <div className="min-h-[844px]">
      <Header leftIcon="LogoIcon" rightIcon="searchshort" />
      <div className="flex flex-col gap-[8px] bg-white pt-[27px]">
        <NewsHomeWrapper />
      </div>
    </div>
  );
>>>>>>> 4d3ade8d4532286a09dbb4d59e2a8b6d93fb8419
}

export default Home;
