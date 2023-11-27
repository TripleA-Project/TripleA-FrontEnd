import dayjs from 'dayjs';
import { type HistogramData, type LineData, type Time } from 'lightweight-charts';
import { getSymbolStock, getV2SymbolStock } from './stock';
import { getSentimentGrade } from '@/util/getSentimentGrade';
import { SentimentGrade, type SentimentGradeLabel } from '@/constants/sentimentGrade';
import { GetSymbolStockPayload, GetSymbolStockV2Payload, type GetSymbolStockSearchParam } from '@/interfaces/Dto/Stock';
import { MEMBERSHIP } from '@/interfaces/User';

export interface GetChartDataRequest extends GetSymbolStockSearchParam {}

export interface SentimentData {
  time: Time;
  value: SentimentGradeLabel;
  color: string;
}

interface GetChartDataPayload {
  lineData: LineData[];
  buzzData: HistogramData[];
  sentimentData: SentimentData[];
}

export interface GetChartDataResponse {
  membership: keyof typeof MEMBERSHIP;
  symbol: string;
  companyName: string;
  payload: GetChartDataPayload | null;
}

/**
 * 차트 데이터 조회
 *
 * `symbol` 심볼 이름 [**string**]
 *
 * `startDate` 시작 날짜 [**string**] - YYYY-MM-DD
 *
 * `startDate` 종료 날짜 [**string**] - YYYY-MM-DD
 *
 * `resampleFreq` 데이터 단위 - `daily` | `weekly` | `monthly` | `annually`
 */
export async function getSymbolChartData({
  symbol,
  startDate,
  endDate,
  resampleFreq,
}: GetChartDataRequest): Promise<GetChartDataResponse> {
  const { data: symbolStockPayload } = await getSymbolStock({ symbol, startDate, endDate, resampleFreq });

  if (symbolStockPayload.status === 401) throw symbolStockPayload;

  const chartData = createChartData(symbolStockPayload.data?.charts);

  return {
    membership: symbolStockPayload.data?.membership as keyof typeof MEMBERSHIP,
    symbol: symbolStockPayload.data?.symbol ?? 'symbol',
    companyName: symbolStockPayload.data?.companyName ?? symbolStockPayload.data?.symbol ?? 'company',
    payload: chartData,
  };
}

export async function getV2SymbolChartData({
  symbol,
  startDate,
  endDate,
  resampleFreq,
}: GetChartDataRequest): Promise<GetChartDataResponse> {
  const { data: symbolStockV2Payload } = await getV2SymbolStock({ symbol, startDate, endDate, resampleFreq });

  if (symbolStockV2Payload.status === 401) throw symbolStockV2Payload;

  const v2ChartData = createV2ChartData({
    price: symbolStockV2Payload.data?.charts,
    meta: symbolStockV2Payload.data?.buzzDataList,
  });

  return {
    membership: symbolStockV2Payload.data?.membership as keyof typeof MEMBERSHIP,
    symbol: symbolStockV2Payload.data?.symbol ?? 'symbol',
    companyName: symbolStockV2Payload.data?.companyName ?? symbolStockV2Payload.data?.symbol ?? 'company',
    payload: v2ChartData,
  };
}

export function createChartData(payload?: GetSymbolStockPayload['charts'] | null): GetChartDataPayload | null {
  if (!payload || payload.length === 0) return null;

  const lineData: LineData[] = [];
  const buzzData: HistogramData[] = [];
  const sentimentData: SentimentData[] = [];

  payload.forEach(({ date, close, buzz, sentiment }) => {
    const { label, color } = SentimentGrade[getSentimentGrade(sentiment)!];

    const parsedDate = dayjs(date).format('YYYY-MM-DD');

    lineData.push({
      time: parsedDate,
      value: close,
    });

    buzzData.push({ time: parsedDate, value: buzz, color });

    sentimentData.push({ time: parsedDate, value: label, color });
  });

  return { lineData, buzzData, sentimentData };
}

export function createV2ChartData(payload?: {
  price: GetSymbolStockV2Payload['charts'];
  meta: GetSymbolStockV2Payload['buzzDataList'];
}): GetChartDataPayload | null {
  if (!payload) return null;

  let lineData: LineData[] = [];
  let buzzData: HistogramData[] = [];
  let sentimentData: SentimentData[] = [];

  if (payload.price && payload.price.length) {
    payload.price.forEach(({ date, close }) => {
      const parsedDate = dayjs(date).format('YYYY-MM-DD');

      lineData.push({
        time: parsedDate,
        value: close,
      });
    });
  }

  if (payload.meta && payload.meta.length) {
    payload.meta.forEach(({ publishedDate, sentiment, count }) => {
      const parsedDate = dayjs(publishedDate).format('YYYY-MM-DD');

      const { label, color } = SentimentGrade[getSentimentGrade(sentiment)];

      sentimentData.push({
        time: parsedDate,
        value: label,
        color,
      });

      buzzData.push({
        time: parsedDate,
        value: count,
        color,
      });
    });
  }

  return { lineData, sentimentData, buzzData };
}
