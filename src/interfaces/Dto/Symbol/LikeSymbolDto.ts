import { type APIResponse } from '../Core';

// 관심 심볼 생성
export interface LikeSymbolParam {
  symbol: string;
}

export interface LikeSymbolResponse extends APIResponse {}
