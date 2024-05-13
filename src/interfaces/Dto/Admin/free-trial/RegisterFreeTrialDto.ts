import { APIResponse } from '../../Core';

export interface RegisterFreeTrialRequest {
  id: number;
  endDate: string;
}

export interface RegisterFreeTrialResponse extends APIResponse {}
