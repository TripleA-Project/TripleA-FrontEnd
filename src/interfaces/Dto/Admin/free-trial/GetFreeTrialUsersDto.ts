import { APIResponse } from '../../Core';
import { SiteUser } from '../GetSiteUsersDto';

export interface GetFreeTrialUsersRequest {}

export type FreeTrialUser = Pick<
  SiteUser,
  'id' | 'email' | 'fullName' | 'freeTierStartDate' | 'freeTierEndDate' | 'memo'
> & {
  freeTier: boolean;
};

export type FreeTrialUsersPayload = FreeTrialUser[];

export interface GetFreeTrialUsersResponse extends APIResponse<FreeTrialUsersPayload> {}
