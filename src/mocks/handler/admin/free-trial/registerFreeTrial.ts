import { API_ROUTE_PATH } from '@/constants/routePath';
import {
  RegisterFreeTrialRequest,
  RegisterFreeTrialResponse,
} from '@/interfaces/Dto/Admin/free-trial/RegisterFreeTrialDto';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockRegisterFreeTrialApi = http.post<PathParams, RegisterFreeTrialRequest, RegisterFreeTrialResponse>(
  getURL(API_ROUTE_PATH.ADMIN.FREE_TRIAL.REGISTER_FERR_TRIAL),
  async ({ request }) => {
    const { id, endDate } = await request.json();

    return HttpResponse.json({ status: HttpStatusCode.Ok, msg: '무료체험 등록 성공' }, { status: HttpStatusCode.Ok });
  },
);
