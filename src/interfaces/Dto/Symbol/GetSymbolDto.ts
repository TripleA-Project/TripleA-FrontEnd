import { type AxiosRequestConfig } from 'axios';
import { type APIResponse } from '../Core';
import { type Symbol } from '@/interfaces/Symbol';

// 심볼 검색
export interface GetSymbolSearchParam {
  symbol: string;
}

export interface GetSymbolRequestConfig extends AxiosRequestConfig {
  params: GetSymbolSearchParam;
}

export interface GetSymbolResponse extends APIResponse<Symbol[]> {}
