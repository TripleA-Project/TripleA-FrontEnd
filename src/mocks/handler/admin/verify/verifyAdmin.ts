import { API_ROUTE_PATH } from '@/constants/routePath';
import { AdminEmailVerifyRequest, AdminEmailVerifyResponse } from '@/interfaces/Dto/Admin/AdminEmailVerifyDto';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockVerifyAdminApi = http.post<PathParams, AdminEmailVerifyRequest, AdminEmailVerifyResponse>(
  getURL(API_ROUTE_PATH.ADMIN.AUTH.ADMIN_EMAIL_VERIFY),
  async ({ request }) => {
    const { email, code } = await request.json();

    if (!email || !code) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.BadRequest,
          msg: '잘못된 요청입니다',
          data: 'badRequest',
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    const testMockCode = 'testemailcode';

    if (testMockCode !== code) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.BadRequest,
          msg: '유효한 코드가 아닙니다.',
          data: 'badRequest',
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '로그인 성공',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
