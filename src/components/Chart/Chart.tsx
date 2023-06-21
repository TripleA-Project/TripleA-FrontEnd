'use client';

import { useState, useRef, useContext } from 'react';
import { type ISeriesApi } from 'lightweight-charts';
import { ChartContext } from '@/context/ChartContext';
import { LightWeightChart, LightWeightChartLineSeries } from './LightWeightChart';
import Button from '../Button/Button';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';

interface ChartProps {
  symbol: string;
  resample: ResampleFrequency;
}

function Chart({ symbol, resample }: ChartProps) {
  const { api } = useContext(ChartContext);

  const today = new Date();
  const oneYearBefore = new Date();
  oneYearBefore.setTime(oneYearBefore.setFullYear(today.getFullYear() - 1));

  console.log({
    today: today.toISOString().substring(0, 10),
    oneYearBefore: oneYearBefore.toISOString().substring(0, 10),
  });

  const [resampleFrequency, setResampleFrequency] = useState<ResampleFrequency>(resample);

  const symbolLineChartRef = useRef<ISeriesApi<'Line'>>(null);

  // 이후 심볼을 활용하여 api 통신을 하고 데이터를 설정하여 렌더링

  return (
    <>
      <Button
        className="!w-40"
        bgColorTheme="orange"
        textColorTheme="white"
        clickHandler={(e) => {
          // 현재는 데이터가 클릭시 데이터가 바뀌는지 테스트 해보기 위해 작성한 코드
          // 이후 일, 주, 월, 년 으로 단위가 바뀐 경우 해당 데이터를 가공해서 다시 설정
          //  => 렌더링
          api?.remove();

          symbolLineChartRef.current?.setData([
            { value: 1, time: '2018-12-12' },
            { value: 2, time: '2018-12-13' },
          ]);
        }}
      >
        일
      </Button>
      <LightWeightChart>
        <LightWeightChartLineSeries
          ref={symbolLineChartRef}
          lineSeriesOptions={{
            color: 'red',
          }}
          lineChartData={[
            { value: 10, time: '2022-12-01' },
            { value: 6, time: '2022-12-02' },
          ]}
        />
      </LightWeightChart>
    </>
  );
}

export default Chart;
