import { APIResponse } from '../Core';

export interface UpdateNoticeRequest {
  id: number;
  title: string;
  content: string;
}

export interface UpdateNoticeResponse extends APIResponse {}
