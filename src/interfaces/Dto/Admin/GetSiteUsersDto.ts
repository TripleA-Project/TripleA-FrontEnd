import { User } from '@/interfaces/User';
import { ProfilePayload } from '../User';
import { APIResponse } from '../Core';

export interface GetSiteUsersRequest {}

export type FreeTrialInfo = {
  freeTierStartDate: string | null;
  freeTierEndDate: string | null;
  memo: string;
};

export type SiteUser = Omit<User, 'emailVerified'> &
  ProfilePayload &
  FreeTrialInfo & {
    id: number;
    createAt: string;
    changeMembershipDate?: string | null;
  };

export type SiteUserPayload = Omit<SiteUser, keyof FreeTrialInfo | 'freeTrial' | 'nextPaymentDate' | 'newsLetter'> & {
  newLetter: boolean;
};
export type SiteUsersPayload = SiteUserPayload[];

export interface GetSiteUsersResponse extends APIResponse<SiteUsersPayload> {}
