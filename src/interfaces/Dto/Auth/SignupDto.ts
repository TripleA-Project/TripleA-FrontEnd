import { type APIResponse } from '../Core';

export interface SignupRequest {
  email: string;
  password: string;
  passwordCheck: string;
  fullName: string;
  newsLetter: boolean;
  emailKey: string;
}

export interface SignupResponse extends APIResponse {}
