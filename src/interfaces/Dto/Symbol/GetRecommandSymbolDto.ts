import { type APIResponse } from '../Core';
import { type Symbol } from '@/interfaces/Symbol';

// 추천 심볼 조회
type GetRecommandSymbolPayload = Symbol[];

export interface GetRecommandSymbolResponse extends APIResponse<GetRecommandSymbolPayload> {}
