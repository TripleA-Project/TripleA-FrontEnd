import type { Metadata } from 'next';
import ChartHomeHeader from '@/components/Layout/Header/ChartHomeHeader';
import ChartHomeGuard from '@/components/Chart/ChartHomeGuard';
import ChartPageHome from '@/components/Chart/ChartPageHome';
import NotFound from '@/components/NotFound';

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

const ChartHomeTabs = ['likedSymbols', 'recommandSymbols'];

function ChartHome({ searchParams }: ChartHomeProps) {
  const tab = searchParams.tab || 'likedSymbols';

  if (!ChartHomeTabs.includes(tab)) {
    return (
      <>
        <ChartHomeHeader />
        <NotFound />
      </>
    );
  }

  return (
    <>
      <ChartHomeHeader />
      {/* @ts-expect-error server component */}
      <ChartHomeGuard>
        <ChartPageHome />
      </ChartHomeGuard>
    </>
  );
}

export default ChartHome;
