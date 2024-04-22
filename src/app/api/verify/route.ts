import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from 'axios';
import { getProfile } from '@/service/user';
import { jwtVerifiedToken } from '@/interfaces/User';

// 관리자 인증 확인 목적의 API
export async function GET(request: NextRequest) {
  const headers = new Headers(request.headers);

  // accessToken (1차 확인)
  try {
    const profileResponse = await getProfile();

    const profile = profileResponse.data.data!;

    if (profile.memberRole !== 'ADMIN') {
      return NextResponse.json(
        {
          status: HttpStatusCode.Forbidden,
          msg: '관리자가 아닙니다',
        },
        { status: HttpStatusCode.Forbidden },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: HttpStatusCode.Unauthorized,
        msg: '인증되지 않음',
        data: 'accessToken',
      },
      { status: HttpStatusCode.Unauthorized },
    );
  }

  // verifiedToken 검증 (2차 확인)
  const authorization = headers.get('Authorization');

  if (!authorization) {
    return NextResponse.json(
      {
        status: HttpStatusCode.Unauthorized,
        msg: '코드 인증이 필요합니다',
        data: 'code',
      },
      { status: HttpStatusCode.Unauthorized },
    );
  }

  const token = authorization.replace(/^Bearer /g, '');

  if (!token) {
    return NextResponse.json(
      {
        status: HttpStatusCode.Unauthorized,
        msg: '코드 인증이 필요합니다',
        data: 'code',
      },
      { status: HttpStatusCode.Unauthorized },
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET!) as jwtVerifiedToken;

    if (!decoded?.codeVerified) {
      return NextResponse.json(
        {
          status: HttpStatusCode.Unauthorized,
          msg: '코드 인증이 필요합니다',
          data: 'code',
        },
        { status: HttpStatusCode.Unauthorized },
      );
    }

    return NextResponse.json({
      status: HttpStatusCode.Ok,
      msg: 'ok',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: HttpStatusCode.Unauthorized,
        msg: '올바른 토큰이 아닙니다',
        data: 'verifiedToken',
      },
      { status: HttpStatusCode.Unauthorized },
    );
  }
}
