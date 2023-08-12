import React, { useState } from 'react';
import SwitchAIAnalysis from './SwitchAIAnalysis';
import { AppLogos } from '@/components/Icons';
import AINewsAnalysisModal from './Modal/AINewsAnalysisModal';

interface AINewsAnalysisProps {
  newsId: number;
  summary: string;
}

export function AINewsAnalysisLoading() {
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

function AINewsAnalysis({ newsId, summary }: AINewsAnalysisProps) {
  const [aiNewsAnalysisActive, setAINewsAnalysisActive] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <div className="flex w-max items-center gap-2">
          <div className="flex items-center gap-2">
            <AppLogos.ChatGpt width={17} height={17} className="-translate-x-[5px]" />
            <span className="text-xs font-semibold leading-none text-[#4E525D]">AI 분석</span>
          </div>
          <SwitchAIAnalysis
            onSwitch={(isOn) => {
              setAINewsAnalysisActive(isOn);
            }}
            value={aiNewsAnalysisActive}
          />
        </div>
      </div>
      <AINewsAnalysisModal
        active={aiNewsAnalysisActive}
        onClose={() => {
          setAINewsAnalysisActive(false);
        }}
        id={newsId}
        summary={summary}
      />
    </>
  );
}

export default AINewsAnalysis;
