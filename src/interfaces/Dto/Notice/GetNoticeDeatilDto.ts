import { Notice } from '@/interfaces/Notice';
import { APIResponse } from '../Core';

export interface GetNoticeDetailRequest {
  id: number;
}

export interface GetNoticeDetailResponse extends APIResponse<Notice> {}
