import { type APIResponse } from '../Core';
import { type User } from '@/interfaces/User';

// 유저 정보 (마이페이지)
export interface GetUserInfoPayload extends Required<Omit<User, 'membership'>> {}

export interface GetUserInfoResponse extends APIResponse<GetUserInfoPayload> {}
