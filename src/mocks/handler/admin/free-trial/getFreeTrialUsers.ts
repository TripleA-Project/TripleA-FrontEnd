import { API_ROUTE_PATH } from '@/constants/routePath';
import { FreeTrialUser, GetFreeTrialUsersResponse } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, PathParams, http } from 'msw';

export const mockGetFreeTrialUsersApi = http.post<PathParams, DefaultBodyType, GetFreeTrialUsersResponse>(
  getURL(API_ROUTE_PATH.ADMIN.FREE_TRIAL.GET_FREE_TRIAL_USERS),
  async () => {
    const freeTrialUsers = siteUser.filter((user) => user.freeTrial);

    if (!freeTrialUsers.length) {
      return HttpResponse.json(
        { status: HttpStatusCode.Ok, msg: '무료체험 유저 조회', data: [] },
        { status: HttpStatusCode.Ok },
      );
    }

    const freeTrialUsersPayload = [
      ...freeTrialUsers.map((user) => {
        const { id, email, fullName, freeTrial, freeTierStartDate, freeTierEndDate, memo } = user;
        return {
          id,
          email,
          fullName,
          freeTier: freeTrial,
          freeTierStartDate,
          freeTierEndDate,
          memo,
        } as FreeTrialUser;
      }),
    ];

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '무료체험 유저 조회',
        data: [...freeTrialUsersPayload],
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
