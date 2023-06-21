import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '차트',
  description: 'Triple A 차트',
};

function Chart() {
  return (
    <div>
      Chart Main Page
      <Link href="/chart/symbol?name=hi&resample=123">링크</Link>
    </div>
  );
}

export default Chart;
