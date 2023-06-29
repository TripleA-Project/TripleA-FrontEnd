'use client';

import { useRef, useState, useLayoutEffect, forwardRef, useImperativeHandle, type ForwardedRef } from 'react';
import LightWeightChartContainer from './LightWeightChartContainer';
import { type ChartOptions, type DeepPartial, type IChartApi } from 'lightweight-charts';
import { type ChartTooltipSource } from '../ChartTooltip';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';

export interface ChartProps {
  resample: ResampleFrequency;
  charts: {
    payload: IChartApi[];
    triggerSize: number;
  };
  source?: ChartTooltipSource;
  tooltipVisible?: boolean;
  timeMarkerVisible?: boolean;
  options?: DeepPartial<ChartOptions>;
  children: React.ReactNode;
}

function LightWeightChart(
  { resample, charts, options, source, timeMarkerVisible, tooltipVisible, children }: ChartProps,
  ref: ForwardedRef<IChartApi>,
) {
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

  useImperativeHandle(ref, () => chartAPIRef.current!);

  return (
    <div ref={chartContainerRef} className="relative">
      {container ? (
<<<<<<< HEAD
        <LightWeightChartContainer ref={chartAPIRef} container={container} options={{ height: 300, ...options }}>
          {children}
        </LightWeightChartContainer>
      ) : (
=======
>>>>>>> 4d3ade8d4532286a09dbb4d59e2a8b6d93fb8419
        <>
          <LightWeightChartContainer
            ref={chartAPIRef}
            resample={resample}
            container={container}
            charts={charts}
            source={source}
            timeMarkerVisible={timeMarkerVisible}
            tooltipVisible={tooltipVisible}
            options={{ height: 322 / 2, ...options } as ChartOptions}
          >
            {children}
          </LightWeightChartContainer>
        </>
      ) : null}
    </div>
  );
}

export default forwardRef(LightWeightChart);
