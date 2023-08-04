import { type Metadata } from 'next';
import ChartSymbolPage from '@/components/Chart/ChartSymbolPage';

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

async function SymbolChart({ searchParams }: PageProps) {
  return <ChartSymbolPage />;
}

export default SymbolChart;
