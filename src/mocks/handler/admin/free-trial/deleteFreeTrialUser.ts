import { API_ROUTE_PATH } from '@/constants/routePath';
import {
  DeleteFreeTrialUserRequest,
  DeleteFreeTrialUserResponse,
} from '@/interfaces/Dto/Admin/free-trial/DeleteFreeTrialUserDto';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, http } from 'msw';

type DeleteFreeTrialUserParams = Record<keyof DeleteFreeTrialUserRequest, string>;

export const mockDeleteFreeTrialUserApi = http.delete<
  DeleteFreeTrialUserParams,
  DefaultBodyType,
  DeleteFreeTrialUserResponse
>(getURL(API_ROUTE_PATH.ADMIN.FREE_TRIAL.DELETE_FREE_TRIAL_USER()), async ({ params }) => {
  const { id } = params;

  const targetUser = siteUser.find((user) => user.id === Number(id));

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

  targetUser.freeTrial = false;
  targetUser.freeTierStartDate = '';
  targetUser.freeTierEndDate = '';
  targetUser.nextPaymentDate = '';

  return HttpResponse.json({ status: HttpStatusCode.Ok, msg: '무료체험 해제 성공' }, { status: HttpStatusCode.Ok });
});
