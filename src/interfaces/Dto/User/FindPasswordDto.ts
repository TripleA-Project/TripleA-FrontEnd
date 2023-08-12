import { type APIResponse } from '../Core';

export interface FindPasswordRequest {
  email: string;
  fullName: string;
}

export interface FindPasswordResponse extends APIResponse {}
