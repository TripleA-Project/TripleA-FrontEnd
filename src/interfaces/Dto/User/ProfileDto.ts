import { type APIResponse } from '../Core';
import { type MEMBER_ROLE, type User } from '@/interfaces/User';

// 유저 프로필
export interface ProfilePayload extends Pick<User, 'email' | 'fullName' | 'membership'> {
  nextPaymentDate?: string;
  memberRole?: MEMBER_ROLE; // 현재는 반영 전, 이후 반영되면 memberRole 적용된 것으로 수정
}

export interface ProfileResponse extends APIResponse<ProfilePayload> {}
