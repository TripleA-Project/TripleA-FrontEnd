import { APIResponse } from '../Core';

export interface GetNumOfSiteUsersRequest {}

export interface NumOfSiteUserPayload {
  totalUserLength: number;
  basicUserLength: number;
  premiumLength: number;
}

export interface GetNumOfSiteUsersResponse extends APIResponse<NumOfSiteUserPayload> {}
