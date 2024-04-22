import { AdminEmailAuthRequest, AdminEmailAuthResponse } from '@/interfaces/Dto/Admin/AdminEmailAuthDto';
import { AdminEmailVerifyRequest, AdminEmailVerifyResponse } from '@/interfaces/Dto/Admin/AdminEmailVerifyDto';
import { ChangeUserRoleRequest, ChangeUserRoleResponse } from '@/interfaces/Dto/Admin/ChangeUserRoleDto';
import { DeleteUserRequest, DeleteUserResponse } from '@/interfaces/Dto/Admin/DeleteUserDto';
import { GetNumOfSiteUsersRequest, GetNumOfSiteUsersResponse } from '@/interfaces/Dto/Admin/GetNumOfSiteUsersDto';
import { GetSiteUsersRequest, GetSiteUsersResponse } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { SearchSiteUserResponse } from '@/interfaces/Dto/Admin/SearchSiteUserDto';
import { APIResponse } from '@/interfaces/Dto/Core';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { PathParams, http, HttpResponse, DefaultBodyType } from 'msw';
import { siteUser } from '../db/siteUser';
import { API_ROUTE_PATH } from '@/constants/routePath';

export const adminHandler = [
  http.post<PathParams<string>, AdminEmailAuthRequest, AdminEmailAuthResponse>(
    getURL(API_ROUTE_PATH.ADMIN.AUTH.SEND_ADMIN_AUTH_EMAIL),
    async () => {
      return HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: '성공',
          data: '이메일 발송 성공',
        },
        { status: HttpStatusCode.Ok },
      );
    },
  ),
  http.post<PathParams<string>, AdminEmailVerifyRequest, AdminEmailVerifyResponse>(
    getURL(API_ROUTE_PATH.ADMIN.AUTH.ADMIN_EMAIL_VERIFY),
    async ({ request }) => {
      const { email, code } = await request.json();

      if (!email || !code) {
        return HttpResponse.json(
          {
            status: HttpStatusCode.BadRequest,
            msg: '잘못된 요청입니다',
            data: 'badRequest',
          },
          { status: HttpStatusCode.BadRequest },
        );
      }

      const testMockCode = 'testemailcode';

      if (testMockCode !== code) {
        return HttpResponse.json(
          {
            status: HttpStatusCode.BadRequest,
            msg: '유효한 코드가 아닙니다.',
            data: 'badRequest',
          },
          { status: HttpStatusCode.BadRequest },
        );
      }

      return HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: '성공',
          data: '로그인 성공',
        },
        { status: HttpStatusCode.Ok },
      );
    },
  ),
  http.get<PathParams<string>, GetSiteUsersRequest, GetSiteUsersResponse>(
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
  ),
  http.post<PathParams<string>, ChangeUserRoleRequest, ChangeUserRoleResponse>(
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
  ),
  http.post<{ id: string }, DeleteUserRequest, DeleteUserResponse>(
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
  ),
  http.get<PathParams, GetNumOfSiteUsersRequest, GetNumOfSiteUsersResponse>(
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
  ),
  http.get<PathParams, DefaultBodyType, SearchSiteUserResponse | APIResponse>(
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
          data: matchedUser.length ? [...matchedUser] : [],
        },
        { status: HttpStatusCode.Ok },
      );
    },
  ),
];
