import { type AxiosRequestConfig } from 'axios';
import { type APIResponse } from '../Core';
import { type Symbol } from '@/interfaces/Symbol';

// 심볼 검색
export interface SearchSymbolSearchParam {
  symbol: string;
}

export interface SearchSymbolRequestConfig extends AxiosRequestConfig {
  params: SearchSymbolSearchParam;
}

export interface SearchSymbolResponse extends APIResponse<Symbol[]> {}
