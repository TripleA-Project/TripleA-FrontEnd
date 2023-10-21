import { type APIResponse } from '../Core';
import { type User } from '@/interfaces/User';

// 유저 프로필
export interface ProfilePayload extends Pick<User, 'email' | 'fullName' | 'membership'> {
  nextPaymentDate?: string;
}

export interface ProfileResponse extends APIResponse<ProfilePayload> {}
