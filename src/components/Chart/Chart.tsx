'use client';

import { LightWeightCandleStickSeries, LightWeightChart } from './LightWeightChart';
import { candleFetcher } from '@/service/chart';

function Chart() {
  return (
    <>
      <LightWeightChart>
        <LightWeightCandleStickSeries fetcher={candleFetcher} />
      </LightWeightChart>
    </>
  );
}

export default Chart;
