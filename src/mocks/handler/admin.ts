import { AdminEmailAuthRequest, AdminEmailAuthResponse } from '@/interfaces/Dto/Admin/AdminEmailAuthDto';
import { AdminEmailVerifyRequest, AdminEmailVerifyResponse } from '@/interfaces/Dto/Admin/AdminEmailVerifyDto';
import { ChangeUserRoleRequest, ChangeUserRoleResponse } from '@/interfaces/Dto/Admin/ChangeUserRoleDto';
import { CreateNoticeRequest, CreateNoticeResponse } from '@/interfaces/Dto/Admin/CreateNoticeDto';
import { DeleteUserRequest, DeleteUserResponse } from '@/interfaces/Dto/Admin/DeleteUserDto';
import { GetNumOfSiteUsersRequest, GetNumOfSiteUsersResponse } from '@/interfaces/Dto/Admin/GetNumOfSiteUsersDto';
import { GetSiteUsersRequest, GetSiteUsersResponse } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { SearchSiteUserRequest, SearchSiteUserResponse } from '@/interfaces/Dto/Admin/SearchSiteUserDto';
import { APIResponse } from '@/interfaces/Dto/Core';
import { adminPath } from '@/service/admin';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { PathParams, http, HttpResponse } from 'msw';
import { siteUser } from '../db/siteUser';

export const adminHandler = [
  http.post<PathParams<string>, AdminEmailAuthRequest, AdminEmailAuthResponse>(
    getURL(adminPath.sendAdminAuthEmail),
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
    getURL(adminPath.adminEmailVerify),
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
  http.get<PathParams<string>, GetSiteUsersRequest, GetSiteUsersResponse>(getURL(adminPath.siteUsers), async () => {
    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: [...siteUser],
      },
      { status: HttpStatusCode.Ok },
    );
  }),
  http.post<PathParams<string>, ChangeUserRoleRequest, ChangeUserRoleResponse>(
    getURL(adminPath.changeUserRole),
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
        targetUser.memberRole = 'ADMIN';
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
  http.post<PathParams<'id'>, DeleteUserRequest, DeleteUserResponse>(
    getURL(adminPath.deleteUser()),
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
  http.get<PathParams<string>, GetNumOfSiteUsersRequest, GetNumOfSiteUsersResponse>(
    getURL(adminPath.numOfSiteUsers),
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
  http.get<PathParams<string>, undefined, SearchSiteUserResponse | APIResponse>(
    getURL(adminPath.searchSiteUser),
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

        return user.membership === content;
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
  http.post<PathParams, CreateNoticeRequest, CreateNoticeResponse>(
    getURL(adminPath.createNotice),
    async ({ request }) => {
      const { title, content } = await request.json();

      console.log({ title, content });

      return HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: '성공',
          data: '공지사항 작성완료',
        },
        { status: HttpStatusCode.Ok },
      );
    },
  ),
];
