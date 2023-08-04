import { AppIcons } from '@/components/Icons';
import ColorTooltip from './ColorTooltip';

function TrendNewsHeader() {
  return (
    <section className="mb-4 flex items-center justify-between">
      <h4 className="flex items-center gap-1">
        <AppIcons.TrendNews className="!h-6 !w-6" />
        <span className="font-bold">요즘 뉴스</span>
      </h4>
      <ColorTooltip />
    </section>
  );
}

export default TrendNewsHeader;
