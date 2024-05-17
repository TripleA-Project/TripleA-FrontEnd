import { API_ROUTE_PATH } from '@/constants/routePath';
import { SiteUserPayload } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { SearchSiteUserResponse } from '@/interfaces/Dto/Admin/SearchSiteUserDto';
import { APIResponse } from '@/interfaces/Dto/Core';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, PathParams, http } from 'msw';

export const mockSearchSiteUserApi = http.get<PathParams, DefaultBodyType, SearchSiteUserResponse | APIResponse>(
  getURL(API_ROUTE_PATH.ADMIN.SEARCH),
  async ({ request }) => {
    const url = new URL(request.url);

    const type = url.searchParams.get('type');
    const content = url.searchParams.get('content');

    if (!type || !content) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.BadRequest,
          msg: '잘못된 요청입니다',
          data: 'badRequest',
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    const matchedUser = siteUser.filter((user) => {
      if (type === 'email') return user.email.search(content) > -1;
      if (type === 'fullName') return user.fullName.search(content) > -1;
      if (type === 'membership') return user.membership === content;
      if (type === 'memberRole') return user.memberRole === content;

      return false;
    });

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: matchedUser.length
          ? [
              ...matchedUser.map((user) => {
                const { id, createAt, email, fullName, memberRole, membership, newsLetter, changeMembershipDate } =
                  user;

                return {
                  id,
                  createAt,
                  email,
                  fullName,
                  memberRole,
                  membership,
                  newLetter: newsLetter ?? false,
                  changeMembershipDate,
                } as SiteUserPayload;
              }),
            ]
          : [],
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
