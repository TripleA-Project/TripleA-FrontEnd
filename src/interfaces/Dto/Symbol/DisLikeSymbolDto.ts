import { type APIResponse } from '../Core';

// 관심 심볼 취소
export interface DisLikeSymbolParam {
  id: number;
}

export interface DisLikeSymbolResponse extends APIResponse {}
