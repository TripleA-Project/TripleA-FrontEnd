import { API_ROUTE_PATH } from '@/constants/routePath';
import { GetSiteUsersRequest, GetSiteUsersResponse } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockGetSiteUsersApi = http.get<PathParams, GetSiteUsersRequest, GetSiteUsersResponse>(
  getURL(API_ROUTE_PATH.ADMIN.GET_SITE_USERS),
  async () => {
    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: [...siteUser],
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
