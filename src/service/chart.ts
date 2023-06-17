import { type HistogramData, type LineData, type Time } from 'lightweight-charts';
import { getSymbolStock } from './stock';
import { getSentimentGrade } from '@/util/getSentimentGrade';
import { SentimentGrade, type SentimentGradeLabel } from '@/constants/sentimentGrade';
import { type GetSymbolStockSearchParam } from '@/interfaces/Dto/Stock';

interface GetChartDataRequest extends GetSymbolStockSearchParam {}

interface SentimentData {
  time: Time;
  value: SentimentGradeLabel;
  color: string;
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
export async function getSymbolChartData({ symbol, startDate, endDate, resampleFreq }: GetChartDataRequest) {
  const { data: symbolStockPayload } = await getSymbolStock({ symbol, startDate, endDate, resampleFreq });

  if (!symbolStockPayload.data?.charts || symbolStockPayload.data?.charts?.length === 0) return { payload: null };

  const lineData: LineData[] = [];
  const buzzData: HistogramData[] = [];
  const sentimentData: SentimentData[] = [];

  symbolStockPayload.data?.charts?.forEach(({ date, close, buzz, sentiment }) => {
    const { label, color } = SentimentGrade[getSentimentGrade(sentiment)!];

    lineData.push({
      time: date,
      value: close,
    });

    buzzData.push({ time: date, value: buzz, color });

    sentimentData.push({ time: date, value: label, color });
  });

  return { payload: { lineData, buzzData, sentimentData } };
}
