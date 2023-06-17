import { type APIResponse } from '../Core';

export interface EmailAuthRequest {
  email: string;
}

export interface EmailAuthResponse extends APIResponse {}
