import { Metadata } from 'next';
import InterestSection from '@/components/Section/InterestSection';
import { newsCategory } from '@/constants/newsCategory';
import { symbolArr } from '@/constants/symbolArr';
export const metadata: Metadata = {
  title: 'TripleA | 관심사 설정',
  description: 'Triple A 관심사 설정',
};

function InterestedPage() {
  return( 
  <div className='flex flex-col gap-[50px] bg-white min-h-[844px]  px-[50px] py-[50px]'>
    <InterestSection title={'관심 카테고리'} arr={newsCategory} type={'category'}/>
    <InterestSection title={'관심 종목'} arr={symbolArr} type={'stock'}/>
  </div>
    )
}

export default InterestedPage;
