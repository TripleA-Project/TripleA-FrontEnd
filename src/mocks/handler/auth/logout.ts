import { API_ROUTE_PATH } from '@/constants/routePath';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, http } from 'msw';

export const logout = http.post(getURL(API_ROUTE_PATH.LOGOUT), async ({ request }) => {
  return HttpResponse.json(
    {
      status: HttpStatusCode.Ok,
      msg: '로그아웃 성공',
    },
    { status: HttpStatusCode.Ok },
  );
});
