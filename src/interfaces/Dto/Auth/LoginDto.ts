import { type APIResponse } from '../Core';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends APIResponse {}
