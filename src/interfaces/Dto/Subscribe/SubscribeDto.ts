import { type APIResponse } from '../Core';

// 구독
interface SubscribePayload {
  payment: string;
}

export interface SubscribeResponse extends APIResponse<SubscribePayload> {}
