import { APIResponse } from '../../Core';

export interface UpdateFreeTrialDateRequest {
  id: number;
  endDate: string;
}

export interface UpdateFreeTrialDateResponse extends APIResponse {}
