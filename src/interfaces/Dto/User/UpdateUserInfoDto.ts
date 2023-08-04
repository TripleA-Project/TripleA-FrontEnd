import { type APIResponse } from '../Core';
import { type SignupRequest } from '../Auth';

// 유저 정보 수정
export interface UpdateUserInfoRequest extends Partial<Omit<SignupRequest, 'emailKey'>> {
  newPassword?: string;
  newPasswordCheck?: string;
}

export interface UpdateUserInfoResponse extends APIResponse {}
