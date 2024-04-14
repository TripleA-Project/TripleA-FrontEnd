import { User } from '@/interfaces/User';
import { ProfilePayload } from '../User';
import { APIResponse } from '../Core';

export interface GetSiteUsersRequest {}

export type SiteUser = Omit<User, 'emailVerified'> &
  Omit<ProfilePayload, 'nextPaymentDate'> & {
    id: number;
    createdAt: string;
    changeMembershipDate?: string | null;
  };

export type SiteUsersPayload = SiteUser[];

export interface GetSiteUsersResponse extends APIResponse<SiteUsersPayload> {}
