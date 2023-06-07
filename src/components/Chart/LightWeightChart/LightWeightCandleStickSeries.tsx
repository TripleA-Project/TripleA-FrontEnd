"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CandlestickSeriesOptions, CandlestickData } from "lightweight-charts";
import { ChartContext } from "@/context/ChartContext";

interface ChartDataFetcher<T = any> {
  (): Promise<T>;
}

interface CandleStickSeriesProps {
  fetcher: ChartDataFetcher<CandlestickData[]>;
  candleStickSeriesOptions?: CandlestickSeriesOptions;
}

function LightWeightCandleStickSeries({
  fetcher,
  candleStickSeriesOptions,
}: CandleStickSeriesProps) {
  const { api } = useContext(ChartContext);
  const [data, setData] = useState<CandlestickData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [fetcher]);

  useEffect(() => {
    if (!api) return;
    if (!loading && data) {
      api.addCandlestickSeries().setData(data!);
      return;
    }
  }, [api, data, loading]);

  if (loading) return <div>candleStick loading...</div>;

  return null;
}

export default LightWeightCandleStickSeries;
