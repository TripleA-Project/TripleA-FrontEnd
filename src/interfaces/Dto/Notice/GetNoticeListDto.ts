import { Notice } from '@/interfaces/Notice';
import { APIResponse } from '../Core';

export interface GetNoticeListRequest {}

export interface GetNoticeListResponse extends APIResponse<Notice[]> {}
