import { API_ROUTE_PATH } from '@/constants/routePath';
import {
  DeleteFreeTrialUserRequest,
  DeleteFreeTrialUserResponse,
} from '@/interfaces/Dto/Admin/free-trial/DeleteFreeTrialUserDto';
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

  return HttpResponse.json({ status: HttpStatusCode.Ok, msg: '무료체험 삭제 성공' }, { status: HttpStatusCode.Ok });
});
