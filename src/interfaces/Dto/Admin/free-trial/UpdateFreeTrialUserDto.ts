import { APIResponse } from '../../Core';

export interface UpdateFreeTrialUserRequest {
  id: number;
  freeTierStartDate: string;
  freeTierEndDate: string;
  memo: string;
}

export interface UpdateFreeTrialUserResponse extends APIResponse {}
