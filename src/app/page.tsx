import CardNews from '@/components/CardNews';
import Modal from '@/components/Modal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TripleA | 뉴스',
  description: 'Triple A 뉴스',
};

const news = {
  newsId : 1,
  //NOTE - symbol 데이터 형태 바뀔 예정
  symbol: 'AAPP',
  source: 'kye',
  title: '롯데타워를 올라간 남자ddddddddddddddddd',
  description: '오전 5시부터 외국인 한 남자가 롯데타워를 오르기 시작했다. 70층 즈음에서 주민에 의해 신고가 접수됐다.',
  thumbnail:'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
  publishedDate: '20230303',
  sentiment:5,
  bookmark: {
    count: 1,
    isBookmark: true
  },
}

function Home() {
  return( 
  <div>
    <Modal size={'small'} title={<>오늘 열람 가능한 횟수<br/>2회 남았어요!</>} content={<></>} mainBtn={'구독하고 무제한으로 보기'} subBtn={'구독 없이 계속 보기'}/>
    <Modal size={'big'} title={<><div>d</div><div>오늘 열람 가능한 횟수를<br/>모두 사용했어요</div></>} content={<>구독 후 번역&요약 글, 감성분석,<br/>키워드, AI분석을 확인할 수 있어요!</>} mainBtn={'구독하러 가기'} subBtn={''}/>
    <CardNews newsId={news.newsId} symbol={news.symbol} source={news.source} title={news.title} description={news.description} thumbnail={news.thumbnail} publishedDate={news.publishedDate} sentiment={news.sentiment} bookmark={news.bookmark} cardDirection=''/>  
    <CardNews newsId={news.newsId} symbol={news.symbol} source={news.source} title={news.title} description={news.description} thumbnail={news.thumbnail} publishedDate={news.publishedDate} sentiment={news.sentiment} bookmark={news.bookmark} cardDirection=''/>  
  </div>
    )
}

export default Home;
