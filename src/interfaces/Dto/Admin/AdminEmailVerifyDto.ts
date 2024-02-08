import { APIResponse } from '../Core';

export interface AdminEmailVerifyRequest {
  email: string;
  code: string;
}

export interface AdminEmailVerifyResponse extends APIResponse {}
