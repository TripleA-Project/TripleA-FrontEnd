import { API_ROUTE_PATH } from '@/constants/routePath';
import { GetNumOfSiteUsersRequest, GetNumOfSiteUsersResponse } from '@/interfaces/Dto/Admin/GetNumOfSiteUsersDto';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockGetNumOfSiteUsersApi = http.get<PathParams, GetNumOfSiteUsersRequest, GetNumOfSiteUsersResponse>(
  getURL(API_ROUTE_PATH.ADMIN.GET_SITE_USERS_NUMS),
  async () => {
    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: {
          totalUserLength: 4,
          basicUserLength: 3,
          premiumLength: 1,
        },
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
