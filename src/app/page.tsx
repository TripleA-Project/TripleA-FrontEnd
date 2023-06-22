import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';
import NewsSection from '@/components/Section/SectionContainer';
import NewsSectionHeader from '@/components/Section/SectionHeader';
import CardNewsContainer from '@/components/CardNews/CardNewsContainer';
import { FireIcon, NewsIcon } from '@/components/Icons';
import { Metadata } from 'next';

import { newsArr } from '@/constants/newsArr';
import InterestSection from '@/components/Section/InterestSection';
import cardSlice from '@/redux/slice/cardSlice';
import { useRouter } from 'next/router';

export const metadata: Metadata = {
  title: 'TripleA | 뉴스',
  description: 'Triple A 뉴스',
};
// const currentNews = [{
//   newsId : 1,
//   //NOTE - symbol 데이터 형태 바뀔 예정
//   symbol: 'AAPP',
//   source: 'kye',
//   title: '롯데타워를 올라간 남자ddddddddddddddddd',
//   description: '오전 5시부터 외국인 한 남자가 롯데타워를 오르기 시작했다. 70층 즈음에서 주민에 의해 신고가 접수됐다.',
//   thumbnail:'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
//   publishedDate: '20230303',
//   sentiment:0,
//   bookmark: {
//     count: 1,
//     isBookmark: true
//   }}]

function Home() {
return( 
  <div className='min-h-[844px]'>
    <Header><Tabbar/></Header>
    <div className='flex flex-col gap-[8px] pt-[27px] bg-white'>
      <NewsSection type={'hotNews'} icon={<FireIcon className='text-[24px] m-auto'/>} title={'요즘 뉴스'}/>
      <NewsSection type={'currentNews'} icon={<NewsIcon className='text-[24px] m-auto'/>} title={'최신 뉴스'}/>
    </div>
  </div>
    )
}

export default Home;