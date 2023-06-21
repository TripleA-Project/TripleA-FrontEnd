'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { ChartOptions, IChartApi } from 'lightweight-charts';
import LightWeightChartContainer from './LightWeightChartContainer';

export interface ChartProps {
  options?: Partial<ChartOptions>;
  children: React.ReactNode;
}

function LightWeightChart({ options, children }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartAPIRef = useRef<IChartApi>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!container) {
      setContainer(chartContainerRef.current);
      return;
    }

    return () => {
      /* eslint-disable-next-line */
      chartAPIRef.current?.remove();
    };
  }, []); /* eslint-disable-line */

  return (
    <div ref={chartContainerRef}>
      {container ? (
        <LightWeightChartContainer ref={chartAPIRef} container={container} options={{ height: 300, ...options }}>
          {children}
        </LightWeightChartContainer>
      ) : (
        <>
          {/* 나중에 스켈레톤과 같은 UI적용할 예정 */}
          <div className="animate-pulse bg-orange-400">차트를 로딩중...</div>
        </>
      )}
    </div>
  );
}

export default LightWeightChart;
