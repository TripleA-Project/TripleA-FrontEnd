import { API_ROUTE_PATH } from '@/constants/routePath';
import { LoginRequest, LoginResponse } from '@/interfaces/Dto/Auth';
import { users } from '@/mocks/db/user';
import { jwtMockAccessTokenSign, jwtMockRefreshTokenSign } from '@/util/actions/jwt';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockJwtSecret = {
  accessToken: 'testAccessToken',
  refreshToken: 'testRefreshToken',
};

export const login = http.post<PathParams, LoginRequest, LoginResponse>(
  getURL(API_ROUTE_PATH.LOGIN),
  async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '유저를 찾을 수 없습니다',
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '유저를 찾을 수 없습니다',
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    if (user.password !== password) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '유저를 찾을 수 없습니다',
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    const [accessToken, refreshToken] = await Promise.all([
      jwtMockAccessTokenSign(
        { id: user.id, role: user.memberRole },
        {
          subject: 'triple-a',
          expiresIn: '1h',
        },
      ),
      jwtMockRefreshTokenSign(
        { id: user.id, role: user.memberRole },
        {
          subject: 'triple-a',
          expiresIn: '14d',
        },
      ),
    ]);

    const res = HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '로그인 성공',
      },
      {
        status: HttpStatusCode.Ok,
        headers: {
          'Set-Cookie': `refreshToken=${refreshToken}; Max-Age=${3600 * 24 * 14}; Path=/;`,
        },
      },
    );

    res.headers.set('Authorization', `Bearer ${accessToken}`);

    return res;
  },
);
