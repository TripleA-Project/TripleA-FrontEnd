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

export interface User {
  email: string;
  fullName: string;
  membership: keyof typeof MEMBERSHIP;
  newsLetter?: boolean;
  emailVerified?: boolean;
}
