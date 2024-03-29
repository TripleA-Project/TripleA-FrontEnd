import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';
import {
  type ProfileResponse,
  type MembershipWithDrawalResponse,
  type UpdateUserInfoRequest,
  type UpdateUserInfoResponse,
  type FindPasswordRequest,
  FindPasswordResponse,
} from '@/interfaces/Dto/User';

/**
 * 유저프로필 조회 API (GET)
 */
export async function getProfile() {
  const getProfileResponse = await axiosInstance.get<ProfileResponse>('/api/auth/user/me');

  return getProfileResponse;
}

/**
 * 회원 탈퇴 API (DELETE)
 */
export async function membershipWithDrawal() {
  const membershipWithDrawalResponse = await axiosInstance.delete<MembershipWithDrawalResponse>('/api/auth/user');

  return membershipWithDrawalResponse;
}

/**
 * 유저 정보 수정 API (PUT)
 *
 * 비밀번호를 변경하지 않는 경우 비밀번호를 빈 상태로 주면 됨
 *
 * `password` 기존 패스워드 [**string**] - optional
 *
 * `passwordCheck` 기존 패스워드 확인 [**string**] - optional
 *
 * `newPassword` 변경된 패스워드 [**string**] - optional
 *
 * `newPasswordCheck` 변경된 패스워드 확인 [**string**] - optional
 *
 * `fullName` 변경된 이름 [**string**] - optional
 *
 * `newsLetter` 뉴스레터 수신 유무 [**boolean**] - optional
 */
export async function updateUserInfo({
  password,
  passwordCheck,
  newPassword,
  newPasswordCheck,
  fullName,
  newsLetter,
}: UpdateUserInfoRequest) {
  const postPayload = {
    ...(password && { password }),
    ...(passwordCheck && { passwordCheck }),
    ...(newPassword && { newPassword }),
    ...(newPasswordCheck && { newPasswordCheck }),
    ...(fullName && { fullName }),
    ...(typeof newsLetter === 'boolean' && { newsLetter }),
  } as UpdateUserInfoRequest;

  const updateUserInfoResponse = await axiosInstance.post<
    any,
    AxiosResponse<UpdateUserInfoResponse>,
    UpdateUserInfoRequest
  >('/api/auth/user', {
    ...postPayload,
  });

  return updateUserInfoResponse;
}

/**
 * 새 비밀번호 발급(비밀번호 찾기) API (POST)
 *
 * `email` [**string**]
 *
 * `fullName` [**string**]
 */
export async function findPassword({ email, fullName }: FindPasswordRequest) {
  const findPasswordResponse = await axiosInstance.post<any, AxiosResponse<FindPasswordResponse>, FindPasswordRequest>(
    '/api/find/password',
    { email, fullName },
  );

  return findPasswordResponse;
}
