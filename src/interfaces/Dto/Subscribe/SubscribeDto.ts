import { type APIResponse } from '../Core';

// 구독 신청
interface SubscribePayload {
  payment: string;
}

export interface SubscribeResponse extends APIResponse<SubscribePayload> {}
