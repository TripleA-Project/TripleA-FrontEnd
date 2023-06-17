import { type APIResponse } from '../Core';
import { type Symbol } from '@/interfaces/Symbol';

// 관심 심볼 조회
type GetLikeSymbolPayload = Symbol[];

export interface GetLikeSymbolResponse extends APIResponse<GetLikeSymbolPayload> {}
