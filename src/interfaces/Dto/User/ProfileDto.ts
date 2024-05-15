import { type APIResponse } from '../Core';
import { type MEMBER_ROLE, type User } from '@/interfaces/User';

// 유저 프로필
export interface ProfilePayload extends Pick<User, 'email' | 'fullName' | 'membership'> {
  nextPaymentDate?: string;
  memberRole: MEMBER_ROLE;
  freeTrial: boolean;
  freeTierStartDate: string | null;
  freeTierEndDate: string | null;
}

export interface ProfileResponse extends APIResponse<ProfilePayload> {}
