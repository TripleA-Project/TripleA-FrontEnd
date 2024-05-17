import { API_ROUTE_PATH } from '@/constants/routePath';
import { AdminEmailAuthRequest, AdminEmailAuthResponse } from '@/interfaces/Dto/Admin/AdminEmailAuthDto';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockSendVerifyAdminEmailApi = http.post<PathParams, AdminEmailAuthRequest, AdminEmailAuthResponse>(
  getURL(API_ROUTE_PATH.ADMIN.AUTH.SEND_ADMIN_AUTH_EMAIL),
  async () => {
    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '이메일 발송 성공',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
