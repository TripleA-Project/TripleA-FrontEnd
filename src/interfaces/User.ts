import { JwtPayload } from 'jsonwebtoken';

export type JwtAuthTokenPayload = {
  id: number;
  role: keyof typeof MEMBER_ROLE;
};

export type jwtVerifiedTokenPayload = {
  email: string;
  codeVerified: boolean;
  sendTimeStamp?: number;
};

export type JwtAuthToken = JwtPayload & JwtAuthTokenPayload;

export type jwtVerifiedToken = JwtPayload & jwtVerifiedTokenPayload;

/**
 * 회원 종류 enum 상수
 *
 * `BASIC` 일반 회원(결제하지 않은 유저)
 *
 * `PREMIUM` 구독 회원(결제한 유저)
 */
export enum MEMBERSHIP {
  'BASIC' = 'BASIC',
  'PREMIUM' = 'PREMIUM',
}

export const MEMBER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type MEMBER_ROLE = (typeof MEMBER_ROLE)['ADMIN'] | (typeof MEMBER_ROLE)['USER'];

export interface User {
  email: string;
  fullName: string;
  membership: keyof typeof MEMBERSHIP;
  newsLetter?: boolean;
  emailVerified?: boolean;
}
