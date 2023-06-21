import { type APIResponse } from '../Core';
import { type User } from '@/interfaces/User';

// 유저 프로필
export interface ProfilePayload extends User {}

export interface ProfileResponse extends APIResponse<ProfilePayload> {}
