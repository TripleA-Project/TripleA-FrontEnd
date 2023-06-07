"use client";

import {
  forwardRef,
  ForwardedRef,
  useEffect,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  useState,
} from "react";
import { ChartOptions, IChartApi, createChart } from "lightweight-charts";
import { ChartContext, ChartContextState } from "@/context/ChartContext";

interface ChartContainerProps {
  options?: Partial<ChartOptions>;
  container: HTMLDivElement;
  children: React.ReactNode;
}

function LightWeightChartContainer(
  { options, container, children }: ChartContainerProps,
  ref: ForwardedRef<IChartApi>
) {
  const chartAPIRef = useRef<{ _api: IChartApi | null; api: () => IChartApi }>({
    _api: null,
    api() {
      if (!this._api) {
        console.log("createAPI", { container });
        this._api = createChart(container, { ...options });
      }

      return this._api;
    },
  });

  const [context, setContext] = useState<ChartContextState>({ api: null });

  useLayoutEffect(() => {
    console.log("layoutEffect");
    chartAPIRef.current.api();
    setContext((prev) => ({ ...prev, api: chartAPIRef.current._api }));
  }, []);

  useImperativeHandle(ref, () => chartAPIRef.current.api());

  return (
    <ChartContext.Provider value={context}>{children}</ChartContext.Provider>
  );
}

LightWeightChartContainer.displayName = "LightWeightChartContainer";

export default forwardRef<IChartApi, ChartContainerProps>(
  LightWeightChartContainer
);
