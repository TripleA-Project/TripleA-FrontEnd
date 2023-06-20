import { type APIResponse } from '../Core';

export interface SignupRequest {
  email: string;
  password: string;
  passwordCheck: string;
  fullName: string;
  newsLetter: boolean;
  emailVerified: boolean;
}

export interface SignupResponse extends APIResponse {}
