import { API_ROUTE_PATH } from '@/constants/routePath';
import { GetNoticeDetailResponse } from '@/interfaces/Dto/Notice/GetNoticeDeatilDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, http } from 'msw';
import jwt from 'jsonwebtoken';
import { mockJwtSecret } from '../auth/login';
import { JwtAuthToken } from '@/interfaces/User';
import { users } from '@/mocks/db/user';

export const getNoticeDetail = http.get<{ id: string }, DefaultBodyType, GetNoticeDetailResponse>(
  getURL(API_ROUTE_PATH.NOTICE.GET_NOTICE_DETAIL()),
  async ({ params, request }) => {
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

    const noticeId = Number(params.id);

    const targetNotice = notice.find((notice) => notice.id === noticeId);

    if (!targetNotice) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: 'badRequest',
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: targetNotice,
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
