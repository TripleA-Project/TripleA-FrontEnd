import { type APIResponse } from '../Core';

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

export interface EmailVerifyResponse extends APIResponse {}
