import { API_ROUTE_PATH } from '@/constants/routePath';
import { MembershipWithDrawalResponse } from '@/interfaces/Dto/User';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, PathParams, http } from 'msw';

export const withDrawl = http.delete<PathParams, DefaultBodyType, MembershipWithDrawalResponse>(
  getURL(API_ROUTE_PATH.WITH_DRAWAL),
  async () => {
    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '탈퇴 성공',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
