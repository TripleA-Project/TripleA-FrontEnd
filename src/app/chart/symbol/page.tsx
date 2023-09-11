import type { Metadata } from 'next';
import SymbolChartPage from '@/components/Chart/SymbolChartPage';
import SymbolChartFetcher from '@/components/Chart/SymbolChartFetcher';
import NotFound from '@/components/NotFound';
import BackButtonHeader from '@/components/Layout/Header/BackButtonHeader';
import type { ResampleFrequency } from '@/interfaces/Dto/Stock';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams?: {
    name: string;
    resample: string;
  };
}

const resampleMeta = {
  daily: '일별',
  weekly: '주별',
  monthly: '월별',
  annually: '년별',
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const symbolName = searchParams?.name ?? '';
  const resample = searchParams?.resample ?? 'daily';

  const resampleTitle = resampleMeta[resample as keyof typeof resampleMeta] ?? resampleMeta['daily'];

  return {
    title: `Triple A | ${symbolName} 심볼 차트 (${resampleTitle})`,
    description: `Triple A ${symbolName} 심볼 차트`,
  };
}

function SymbolChart({ searchParams }: PageProps) {
  // return <ChartSymbolPage />;

  const name = searchParams?.name;
  const resample = searchParams?.resample || 'daily';

  if (!name || !Object.keys(resampleMeta).includes(resample)) {
    return (
      <>
        <BackButtonHeader />
        <NotFound />
      </>
    );
  }

  return (
    <>
      {/* @ts-expect-error server component */}
      <SymbolChartFetcher symbol={name} resample={resample}>
        <SymbolChartPage resample={resample as ResampleFrequency} />
      </SymbolChartFetcher>
    </>
  );
}

export default SymbolChart;
