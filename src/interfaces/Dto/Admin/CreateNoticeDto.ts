import { APIResponse } from '../Core';

export interface CreateNoticeRequest {
  title: string;
  content: string;
}

export interface CreateNoticeResponse extends APIResponse {}
