import { API_ROUTE_PATH } from '@/constants/routePath';
import { ChangeUserRoleRequest, ChangeUserRoleResponse } from '@/interfaces/Dto/Admin/ChangeUserRoleDto';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const mockChangeUserRoleApi = http.post<PathParams, ChangeUserRoleRequest, ChangeUserRoleResponse>(
  getURL(API_ROUTE_PATH.ADMIN.MANAGE_USER.CHANGE_USER_ROLE),
  async ({ request }) => {
    const { email, role } = await request.json();

    if (!email || !role) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.BadRequest,
          msg: '잘못된 요청입니다',
          data: 'bad request',
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    const targetUser = siteUser.find((user) => user.email === email);

    if (targetUser) {
      targetUser.memberRole = role;
    }

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '권한 설정 성공',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
