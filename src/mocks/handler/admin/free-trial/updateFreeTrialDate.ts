import { API_ROUTE_PATH } from '@/constants/routePath';
import {
  UpdateFreeTrialDateRequest,
  UpdateFreeTrialDateResponse,
} from '@/interfaces/Dto/Admin/free-trial/UpdateFreeTrialDateDto';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockUpdateFreeTrialDateApi = http.post<
  PathParams,
  UpdateFreeTrialDateRequest,
  UpdateFreeTrialDateResponse
>(getURL(API_ROUTE_PATH.ADMIN.FREE_TRIAL.UPDATE_FREE_TRIAL_DATE), async ({ request }) => {
  const { id, endDate } = await request.json();

  return HttpResponse.json(
    {
      status: HttpStatusCode.Ok,
      msg: '무료체험 수정 성공',
    },
    {
      status: HttpStatusCode.Ok,
    },
  );
});
