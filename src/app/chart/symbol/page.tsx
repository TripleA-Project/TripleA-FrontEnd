import { type Metadata } from 'next';
import { Chart as AppChart } from '@/components/Chart';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';
import { searchSymbolNews } from '@/service/news';

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
  day: '일별',
  weekly: '주별',
  monthly: '월별',
  annually: '년별',
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const symbolName = searchParams?.name ?? '';
  const resample = searchParams?.resample ?? 'day';

  const resampleTitle = resampleMeta[resample as keyof typeof resampleMeta] ?? resampleMeta['day'];

  return {
    title: `${symbolName} 심볼 차트 (${resampleTitle})`,
    description: `Triple A ${symbolName} 심볼 차트`,
  };
}

async function SymbolChart({ searchParams }: PageProps) {
  const symbol = searchParams?.name ?? '';
  const resample: ResampleFrequency =
    searchParams?.resample && Object.keys(resampleMeta).includes(searchParams.resample)
      ? (searchParams.resample as any)
      : 'daily';

  const newsResponse = await searchSymbolNews({ symbol, page: 0, size: 3 });

  return <AppChart symbol={symbol} resample={resample} data={{ news: newsResponse.data }} />;
}

export default SymbolChart;
