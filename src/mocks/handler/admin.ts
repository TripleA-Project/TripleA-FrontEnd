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
import { PathParams, http, HttpResponse, StrictRequest } from 'msw';

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
        data: [
          {
            id: 1,
            createdAt: '2023-11-30T15:03:58.32791+09:00',
            email: 'testUser@email.com',
            fullName: 'test',
            newsLetter: true,
            membership: 'PREMIUM',
            memberRole: 'USER',
            changeMembershipDate: null,
          },
        ],
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
    getURL(`${adminPath.deleteUser}/:id`),
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

      return HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: '성공',
          data: [
            {
              id: 2,
              createdAt: '2023-12-01T13:14:09+09:00',
              email: 'test@test.com',
              fullName: 'test',
              newsLetter: false,
              membership: 'BASIC',
              memberRole: 'USER',
              changeMembershipDate: null,
            },
          ],
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
