import { API_ROUTE_PATH } from '@/constants/routePath';
import { GetNoticeListResponse } from '@/interfaces/Dto/Notice/GetNoticeListDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, http } from 'msw';
import jwt from 'jsonwebtoken';
import { users } from '@/mocks/db/user';
import { mockJwtSecret } from '../auth/login';
import { JwtAuthToken } from '@/interfaces/User';

export const getNoticeList = http.get<any, DefaultBodyType, GetNoticeListResponse>(
  getURL(API_ROUTE_PATH.NOTICE.GET_NOTICE_LIST),
  async ({ request }) => {
    const authorization = request.headers.get('Authorization');

    if (!authorization) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.Unauthorized,
          msg: '인증되지 않은 유저입니다.',
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    const accessToken = authorization.replace(/^Bearer /g, '');

    try {
      const decoded = jwt.verify(accessToken, mockJwtSecret.accessToken) as JwtAuthToken;

      const user = users.find((user) => user.id === decoded.id);
      if (!user) {
        return HttpResponse.json(
          {
            status: HttpStatusCode.Unauthorized,
            msg: '인증되지 않은 유저입니다.',
          },
          {
            status: HttpStatusCode.Unauthorized,
          },
        );
      }
    } catch (error) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.Unauthorized,
          msg: '인증되지 않은 유저입니다.',
        },
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    const noticeList = notice;

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: [...noticeList],
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
