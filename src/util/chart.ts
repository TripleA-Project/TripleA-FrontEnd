import dayjs from 'dayjs';
import { type HistogramData, type LineData, type Time } from 'lightweight-charts';
import { type ResampleFrequency } from '@/interfaces/Dto/Stock';
import { GetChartDataRequest, getSymbolChartData } from '@/service/chart';

export const DeltaPriceType = {
  NO_CHANGE: '--',
  PLUS: '+',
  MINUS: '-',
} as const;

export const DeltaPriceColor = {
  NO_CHANGE: '#000',
  PLUS: '#E91B1B',
  MINUS: '#759DEB',
} as const;

export interface PriceInfo {
  delta: { type: keyof typeof DeltaPriceType; value: number; percent: number };
  close: number;
}

export function getTimeMarker(time: Time, resample: ResampleFrequency) {
  switch (resample) {
    case 'daily':
      return dayjs(time as string).format('M.DD');
    case 'weekly':
      const targetDate = dayjs(time as string);
      const month = targetDate.format('M');
      const startDayofMonth = targetDate.set('dates', 1);
      const week = parseInt('' + (startDayofMonth.get('day') - 1 + targetDate.get('D')) / 7) + 1;

      return `${month}월${week}주`;
    case 'monthly':
      return `${dayjs(time as string).format('M')}월`;
    default:
      return dayjs(time as string).format('M.DD');
  }
}

export const getDataMinMax: <T extends LineData | HistogramData>(
  data: T[],
) => { min: { target?: T; value: number }; max: { target?: T; value: number } } = (data) => {
  const maxValue = Math.max.apply(
    Math,
    data.map((chartData) => chartData.value),
  );

  const minValue = Math.min.apply(
    Math,
    data.map((chartData) => chartData.value),
  );

  const minTarget = data.find((chartData) => chartData.value === minValue);
  const maxTarget = data.find((chartData) => chartData.value === maxValue);

  return { min: { target: minTarget, value: minValue }, max: { target: maxTarget, value: maxValue } };
};

export async function getPriceInfo({
  symbol,
  startDate,
  endDate,
}: Omit<GetChartDataRequest, 'resampleFreq'>): Promise<PriceInfo> {
  const res = await getSymbolChartData({ symbol, startDate, endDate, resampleFreq: 'daily' });

  if (!res.payload?.lineData) return { delta: { type: 'NO_CHANGE', value: 0, percent: 0 }, close: 0 };

  function getDeltaType(delta: number): keyof typeof DeltaPriceType {
    if (delta === 0) return 'NO_CHANGE';
    if (delta > 0) return 'PLUS';
    if (delta < 0) return 'MINUS';

    return 'NO_CHANGE';
  }

  const dataLength = res.payload.lineData.length;

  const todayPrice = res.payload.lineData[dataLength - 1].value;
  const yesterdayPrice = res.payload.lineData[dataLength - 2].value;

  const deltaPrice = Number((todayPrice - yesterdayPrice).toFixed(2));

  return {
    delta: {
      type: getDeltaType(deltaPrice),
      value: Math.abs(deltaPrice),
      percent: Number(((Math.abs(deltaPrice) / yesterdayPrice) * 100).toFixed(1)),
    },
    close: todayPrice,
  };
}
