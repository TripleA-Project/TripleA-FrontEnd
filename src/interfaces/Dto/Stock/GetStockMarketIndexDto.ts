import { type APIResponse } from '../Core';
import { type StockMarketIndex } from '@/interfaces/StockMarketIndex';

// 주가 지수 조회(나스닥 , ...)
interface StockMarketIndexPayload {
  stocks: StockMarketIndex[];
}

export interface GetStockMarketIndexResponse extends APIResponse<StockMarketIndexPayload> {}
