"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { ChartOptions, IChartApi, createChart } from "lightweight-charts";
import LightWeightChartContainer from "./LightWeightChartContainer";

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
        <LightWeightChartContainer
          ref={chartAPIRef}
          container={container}
          options={{ height: 300 }}
        >
          {children}
        </LightWeightChartContainer>
      ) : null}
    </div>
  );
}

export default LightWeightChart;
