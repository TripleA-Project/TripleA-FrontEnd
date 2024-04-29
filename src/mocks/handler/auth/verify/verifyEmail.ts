import { API_ROUTE_PATH } from '@/constants/routePath';
import { EmailVerifyRequest, EmailVerifyResponse } from '@/interfaces/Dto/Auth';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const verifyEmail = http.post<PathParams, EmailVerifyRequest, EmailVerifyResponse>(
  getURL(API_ROUTE_PATH.VERIFY.VERIFY_EMAIL),
  async ({ request }) => {
    const { email, code } = await request.json();

    if (!code || code !== 'testemailcode') {
      return HttpResponse.json(
        {
          status: HttpStatusCode.BadRequest,
          msg: '유효한 코드가 아닙니다',
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '이메일 검증 성공',
        data: 'testemailkey',
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
