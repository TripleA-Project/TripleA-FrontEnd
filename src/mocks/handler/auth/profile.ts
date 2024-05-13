import { API_ROUTE_PATH } from '@/constants/routePath';
import { ProfileResponse } from '@/interfaces/Dto/User';
import { users } from '@/mocks/db/user';
import jwt from 'jsonwebtoken';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, PathParams, http } from 'msw';
import { JwtAuthToken } from '@/interfaces/User';

export const profile = http.get<PathParams, DefaultBodyType, ProfileResponse>(
  getURL(API_ROUTE_PATH.USER.PROFILE),
  async ({ request }) => {
    const authorization = request.headers.get('authorization');

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
      const decoded = jwt.decode(accessToken) as JwtAuthToken;
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

      const { email, fullName, membership, memberRole, freeTrial, freeTierEndDate, nextPaymentDate } = user;

      return HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: '유저 조회 성공',
          data: {
            email,
            fullName,
            membership,
            memberRole,
            nextPaymentDate: freeTrial ? freeTierEndDate : nextPaymentDate,
            freeTrial,
          },
        },
        {
          status: HttpStatusCode.Ok,
        },
      );
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
  },
);
