import { Metadata } from 'next';
import Subscribe from '@/components/Subscribe';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '구독 조회',
  description: 'Triple A 구독 조회',
};

function SubscribePage() {
  return <Subscribe />;
}

export default SubscribePage;
