import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { AxiosError, HttpStatusCode } from 'axios';
import { JwtVerifiedToken } from '@/interfaces/User';
import { getSiteUsers } from '@/service/admin';

// 관리자 인증 확인 목적의 API
export async function GET(request: NextRequest) {
  const headers = new Headers(request.headers);

  // accessToken 검증 목적 (1차 확인)
  /*
    - api 응답 속도 때문에 프로필 api가 아닌 다른 api를 이용하여 러프하게 체크
    - 관리자 유저 목록 조회 api는 22 ~ 40ms 정도 소요되는 반면, 
      프로필 api는 1.8 ~ 2초 정도 걸림
      (/api/auth/user 는 응답속도는 빠르나 role이 포함되있지 않아, 관리자인지 확인 어려움)
    - 미들웨어에서 사용하기 때문에, 최대한 빠르게 응답해주는 api 활용 필요
  */
  try {
    await getSiteUsers();
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status } = error;

      if (status === HttpStatusCode.Unauthorized) {
        return NextResponse.json(
          {
            status: HttpStatusCode.Unauthorized,
            msg: '인증되지 않음',
            data: 'accessToken',
          },
          { status: HttpStatusCode.Unauthorized },
        );
      }

      if (status === HttpStatusCode.Forbidden) {
        return NextResponse.json(
          {
            status: HttpStatusCode.Forbidden,
            msg: '관리자가 아닙니다',
          },
          { status: HttpStatusCode.Forbidden },
        );
      }
    }

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
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_VERIFY_SECRET!) as JwtVerifiedToken;

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
