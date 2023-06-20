import { type APIResponse } from '../Core';

// 구독 세션키 조회
interface GetSubscribeSessionPayload {
  session: string;
}

export interface GetSubscribeSessionResponse extends APIResponse<GetSubscribeSessionPayload> {}
