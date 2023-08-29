import { AppLogos } from '@/components/Icons';
import SwitchAIAnalysis from '../AINewsAnalysis/SwitchAIAnalysis';

function AINewsSwitchLoading() {
  return (
    <div className="flex justify-end">
      <div className="flex w-max items-center gap-2">
        <div className="flex items-center gap-2">
          <AppLogos.ChatGpt width={17} height={17} className="-translate-x-[5px]" />
          <span className="text-xs font-semibold leading-none text-[#4E525D]">AI 분석</span>
        </div>
        <SwitchAIAnalysis />
      </div>
    </div>
  );
}

export default AINewsSwitchLoading;
