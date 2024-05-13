import { APIResponse } from '../../Core';

export interface UpdateFreeTrialDateRequest {
  id: number;
  freeTierStartDate: string;
  freeTierEndDate: string;
  memo: string;
}

export interface UpdateFreeTrialDateResponse extends APIResponse {}
