import { API_ROUTE_PATH } from '@/constants/routePath';
import { RequestAccessTokenResponse } from '@/interfaces/Dto/Auth';
import { getURL } from '@/util/url';
import { DefaultBodyType, HttpResponse, PathParams, http } from 'msw';
import { HttpStatusCode } from 'axios';
import { jwtMockAccessTokenSign, jwtMockRefreshTokenVerify } from '@/util/actions/jwt';

export const requestAccessToken = http.post<PathParams, DefaultBodyType, RequestAccessTokenResponse>(
  getURL(API_ROUTE_PATH.REQUEST_ACCESS_TOKEN),
  async ({ cookies }) => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.Unauthorized,
          msg: '인증되지 않음',
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    try {
      const decoded = await jwtMockRefreshTokenVerify(refreshToken);

      const newAccessToken = await jwtMockAccessTokenSign(
        { id: decoded.id, role: decoded.role },
        {
          subject: 'triple-a',
          expiresIn: '1h',
        },
      );

      const res = HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: '성공',
        },
        {
          status: HttpStatusCode.Ok,
        },
      );

      res.headers.set('Authorization', `Bearer ${newAccessToken}`);

      return res;
    } catch (error) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.Unauthorized,
          msg: '인증되지 않음',
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }
  },
);
