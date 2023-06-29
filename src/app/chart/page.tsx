import SymbolTabs from '@/components/Chart/SymbolTabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '차트',
  description: 'Triple A 차트',
};

function Chart() {
  return (
    <div className="bg-[#F5F7F9]" style={{ minHeight: 'calc(100vh - 3.5rem)' }}>
      <SymbolTabs />
    </div>
  );
}

export default Chart;
