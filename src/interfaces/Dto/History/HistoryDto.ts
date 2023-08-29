import { type AxiosRequestConfig } from 'axios';
import { type APIResponse } from '../Core';
import { type NewsHistory } from '@/interfaces/History';

// 뉴스 히스토리
export interface GetNewsHistorySearchParam {
  year: number;
  month: number;
}

export interface GetNewsHistoryRequestConfig extends AxiosRequestConfig {
  params: GetNewsHistorySearchParam;
}

export type HistoryPayload = NewsHistory[];

export interface GetNewsHistroyResponse extends APIResponse<HistoryPayload> {}
