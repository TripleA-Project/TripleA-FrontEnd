import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { Chart as AppChart } from '@/components/Chart';
import { ResampleFrequency } from '@/interfaces/Dto/Stock';

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

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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

  return (
    <div>
      Chart Symbol Page
      <Suspense fallback={<>로딩테스트...</>}>
        <AppChart symbol={symbol} resample={resample} />
      </Suspense>
    </div>
  );
}

export default SymbolChart;
