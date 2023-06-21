import { type AxiosRequestConfig } from 'axios';
import { type APIResponse } from '../Core';
import { MEMBERSHIP } from '@/interfaces/User';
import { type SymbolPrice } from '@/interfaces/Symbol';

// 심볼 주식 차트
export type ResampleFrequency = 'daily' | 'weekly' | 'monthly' | 'annually';

export interface GetSymbolStockSearchParam {
  symbol: string;
  startDate: string;
  endDate: string;
  resampleFreq: ResampleFrequency;
}

export interface GetSymbolStockRequestConfig extends AxiosRequestConfig {
  params: GetSymbolStockSearchParam;
}

export interface ChartData extends SymbolPrice {
  sentiment: number;
  buzz: number;
}

interface GetSymbolStockPayload {
  membership: keyof typeof MEMBERSHIP;
  symbol: string;
  companyName?: string;
  charts?: ChartData[];
}

export interface GetSymbolStockResponse extends APIResponse<GetSymbolStockPayload> {}
