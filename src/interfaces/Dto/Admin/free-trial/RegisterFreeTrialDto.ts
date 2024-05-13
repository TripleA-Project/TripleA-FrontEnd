import { APIResponse } from '../../Core';

export interface RegisterFreeTrialRequest {
  id: number;
  freeTierStartDate: string;
  freeTierEndDate: string;
  memo: string;
}

export interface RegisterFreeTrialResponse extends APIResponse {}
