import { API_ROUTE_PATH } from '@/constants/routePath';
import {
  UpdateFreeTrialDateRequest,
  UpdateFreeTrialDateResponse,
} from '@/interfaces/Dto/Admin/free-trial/UpdateFreeTrialDateDto';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockUpdateFreeTrialApi = http.post<PathParams, UpdateFreeTrialDateRequest, UpdateFreeTrialDateResponse>(
  getURL(API_ROUTE_PATH.ADMIN.FREE_TRIAL.UPDATE_FREE_TRIAL_DATE),
  async ({ request }) => {
    const { id, freeTierStartDate, freeTierEndDate, memo } = await request.json();

    const targetUser = siteUser.find((user) => user.id === id);

    if (!targetUser) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '유저를 찾을 수 없습니다.',
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    if (targetUser.membership === 'PREMIUM') {
      return HttpResponse.json(
        { status: HttpStatusCode.BadRequest, msg: '구독중인 유저입니다.' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    if (!targetUser.freeTrial) {
      return HttpResponse.json(
        { status: HttpStatusCode.BadRequest, msg: '무료체험중인 유저가 아닙니다.' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    targetUser.freeTierStartDate = freeTierStartDate;
    targetUser.freeTierEndDate = freeTierEndDate;
    targetUser.memo = memo;
    targetUser.nextPaymentDate = freeTierEndDate;

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '무료체험 수정 성공',
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
