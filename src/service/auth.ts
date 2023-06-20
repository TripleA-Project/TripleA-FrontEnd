import { type AxiosResponse } from 'axios';
import { axiosInstance } from './axios';
import {
  type LoginRequest,
  type LoginResponse,
  type SignupRequest,
  type SignupResponse,
  type EmailAuthRequest,
  type EmailAuthResponse,
  type EmailVerifyRequest,
  type EmailVerifyResponse,
  type LogoutResponse,
  type RequestAccessTokenRequest,
  type RequestAccessTokenResponse,
} from '@/interfaces/Dto/Auth';

/**
 * 로그인 API (POST)
 *
 * `email` 유저 이메일 [**string**]
 *
 * `password` 패스워드 [**string**]
 */
export async function login({ email, password }: LoginRequest) {
  const loginResponse = await axiosInstance.post<any, AxiosResponse<LoginResponse>, LoginRequest>('/api/login', {
    email,
    password,
  });

  return loginResponse;
}

/**
 * 로그아웃 API (GET)
 */
export async function logout() {
  const logoutResponse = await axiosInstance.get<LogoutResponse>('/api/logout');

  return logoutResponse;
}

/**
 * 회원가입 API (POST)
 *
 * `email` 이메일 [**string**]
 *
 * `password` 비밀번호 [**string**]
 *
 * `passwordCheck` 비밀번호 확인 [**string**]
 *
 * `fullName` 이름 [**string**]
 *
 * `newsLetter` 뉴스레터 수신 유무 [**boolean**]
 *
 * `emailVerified` 이메일 인증 유무 [**boolean**]
 *
 */
export async function signup({ email, password, passwordCheck, fullName, newsLetter, emailVerified }: SignupRequest) {
  const signupResponse = await axiosInstance.post<any, AxiosResponse<SignupResponse>, SignupRequest>('/api/join', {
    email,
    password,
    passwordCheck,
    fullName,
    newsLetter,
    emailVerified,
  });

  return signupResponse;
}

/**
 * 액세스토큰 요청 API (GET)
 *
 * `refreshToken` 리프레시 토큰 [**string**] - Bearer
 */
export async function requestAccessToken({ refreshToken }: RequestAccessTokenRequest) {
  const requestAccessTokenResponse = await axiosInstance.get<RequestAccessTokenResponse>('/auth', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return requestAccessTokenResponse;
}

/**
 * 인증 이메일 발송 API (POST)
 *
 * `email` 발송할 이메일 주소 [**string**]
 */
export async function verifyEmailSend({ email }: EmailAuthRequest) {
  const emailAuthResponse = await axiosInstance.post<any, AxiosResponse<EmailAuthResponse>, EmailAuthRequest>(
    '/api/email',
    {
      email,
    },
  );

  return emailAuthResponse;
}

/**
 * 이메일 인증 API (POST)
 *
 * `email` 이메일 [**string**]
 *
 * `code` 인증 코드 [**string**]
 */
export async function verifyEmail({ email, code }: EmailVerifyRequest) {
  const emailVerifyResponse = await axiosInstance.post<any, AxiosResponse<EmailVerifyResponse>, EmailVerifyRequest>(
    '/api/email/verify',
    {
      email,
      code,
    },
  );

  return emailVerifyResponse;
}
