import { type APIResponse } from '../Core';

export interface RequestAccessTokenRequest {
  refreshToken: string;
}

export interface RequestAccessTokenResponse extends APIResponse {}
