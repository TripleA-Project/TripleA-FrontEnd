import { type AxiosRequestConfig } from 'axios';
import { type APIResponse } from '../Core';

// 구독 확인
export interface SuccessSubscribeSearchParams {
  ['order_code']: string;
}

export interface SuccessSubscribeRequestConfig extends AxiosRequestConfig {
  params: SuccessSubscribeSearchParams;
}

export interface SuccessSubscribeResponse extends APIResponse {}
