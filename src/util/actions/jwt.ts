'use server';

import { JwtAuthToken, JwtAuthTokenPayload, JwtVerifiedToken, JwtVerifiedTokenPayload } from '@/interfaces/User';
import { mockJwtSecret } from '@/mocks/handler/auth/login';
import jwt, { Secret, SignOptions, VerifyOptions, DecodeOptions, JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// common
export async function jwtSign(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions) {
  return jwt.sign(payload, secretOrPrivateKey ?? mockJwtSecret.accessToken, options);
}

export async function jwtVerify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions) {
  return jwt.verify(token, secretOrPublicKey, options);
}

export async function jwtDecode(token: string, options?: DecodeOptions) {
  return jwt.decode(token, options);
}

// accessToken
export async function jwtMockAccessTokenSign(payload: JwtAuthTokenPayload, options?: SignOptions) {
  return jwt.sign(payload, mockJwtSecret.accessToken, options);
}

export async function jwtMockAccessTokenVerify(token: string, options?: VerifyOptions) {
  return jwt.verify(token, mockJwtSecret.accessToken, options) as JwtAuthToken;
}

// refreshToken
export async function jwtMockRefreshTokenSign(payload: JwtAuthTokenPayload, options?: SignOptions) {
  return jwt.sign(payload, mockJwtSecret.refreshToken, options);
}

export async function jwtMockRefreshTokenVerify(token: string, options?: VerifyOptions) {
  return jwt.verify(token, mockJwtSecret.refreshToken, options) as JwtAuthToken;
}

// auth token decode
export async function jwtAuthTokenDecode(token: string, options?: DecodeOptions) {
  return jwt.decode(token, options) as JwtAuthToken;
}

// verifiedToken
export async function jwtVerifiedTokenSign(payload: JwtVerifiedTokenPayload, options?: SignOptions) {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET!, options);
}

export async function jwtVerifiedTokenDecode(token: string, options?: DecodeOptions) {
  return jwt.decode(token, options) as JwtVerifiedToken;
}

export async function jwtVerifiedTokenVerify(token: string, options?: VerifyOptions) {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET!, options) as JwtVerifiedToken;
}

// token util
export async function adminTokenVerify() {
  const token = cookies().get('verifiedToken')?.value;
  if (!token) return false;

  let decoded: JwtVerifiedToken | null = null;
  try {
    decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET!) as JwtVerifiedToken;
  } catch (error) {
    decoded = null;
  }

  return !!decoded?.codeVerified;
}
