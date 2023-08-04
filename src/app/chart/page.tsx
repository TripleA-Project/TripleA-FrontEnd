import { Metadata } from 'next';
import ChartPageHome from '@/components/Chart/ChartPageHome';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ChartHomeProps {
  searchParams: {
    [key: string]: string;
    tab: string;
  };
}

export const metadata: Metadata = {
  title: 'Triple A | 차트',
  description: 'Triple A 차트',
};

async function ChartHome({ searchParams }: ChartHomeProps) {
  return <ChartPageHome />;
}

export default ChartHome;
