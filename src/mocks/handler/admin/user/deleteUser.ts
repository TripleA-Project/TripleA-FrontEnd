import { API_ROUTE_PATH } from '@/constants/routePath';
import { DeleteUserRequest, DeleteUserResponse } from '@/interfaces/Dto/Admin/DeleteUserDto';
import { siteUser } from '@/mocks/db/siteUser';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, http } from 'msw';

export const mockDeleteUserApi = http.post<{ id: string }, DeleteUserRequest, DeleteUserResponse>(
  getURL(API_ROUTE_PATH.ADMIN.MANAGE_USER.DELETE_USER()),
  async ({ params }) => {
    const { id } = params;

    if (!id) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.BadRequest,
          msg: '잘못된 요청입니다',
          data: 'bad request',
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    const targetUserIndex = siteUser.findIndex((user) => user.id === Number(id));

    if (targetUserIndex === -1) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '유저를 찾을 수 없습니다',
        },
        { status: HttpStatusCode.NotFound },
      );
    }

    siteUser.splice(targetUserIndex, 1);

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '탈퇴처리 성공',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
