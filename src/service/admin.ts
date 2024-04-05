import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';
import { AdminEmailAuthRequest, AdminEmailAuthResponse } from '@/interfaces/Dto/Admin/AdminEmailAuthDto';
import { AdminEmailVerifyRequest, AdminEmailVerifyResponse } from '@/interfaces/Dto/Admin/AdminEmailVerifyDto';
import { GetSiteUsersResponse } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { ChangeUserRoleRequest, ChangeUserRoleResponse } from '@/interfaces/Dto/Admin/ChangeUserRoleDto';
import { DeleteUserRequest, DeleteUserResponse } from '@/interfaces/Dto/Admin/DeleteUserDto';
import { GetNumOfSiteUsersResponse } from '@/interfaces/Dto/Admin/GetNumOfSiteUsersDto';
import {
  SearchSiteUserRequest,
  SearchSiteUserRequestConfig,
  SearchSiteUserResponse,
} from '@/interfaces/Dto/Admin/SearchSiteUserDto';
import { CreateNoticeRequest, CreateNoticeResponse } from '@/interfaces/Dto/Admin/CreateNoticeDto';

/**
 * [Admin] 관리자 인증 메일 발송 API (POST)
 */
export async function sendAdminAuthEmail() {
  const res = await axiosInstance.post<any, AxiosResponse<AdminEmailAuthResponse>, AdminEmailAuthRequest>(
    adminPath.sendAdminAuthEmail,
  );

  return res;
}

/**
 * [Admin] 관리자 인증코드 검증 API (POST)
 *
 * `email` 이메일 [**string**]
 *
 * `code` 인증코드 [**string**]
 */
export async function adminEmailVerify({ email, code }: AdminEmailVerifyRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<AdminEmailVerifyResponse>, AdminEmailVerifyRequest>(
    adminPath.adminEmailVerify,
    {
      email,
      code,
    },
  );

  return res;
}

/**
 * [Admin] 사이트 유저리스트 API (GET)
 */
export async function getSiteUsers() {
  const res = await axiosInstance.get<GetSiteUsersResponse>(adminPath.siteUsers);

  return res;
}

/**
 * 유저권한설정 API (POST)
 *
 * `email` 유저 이메일 [**string**]
 *
 * `role` 설정 role [ **ADMIN** | **USER** ]
 */
export async function changeUserRole({ email, role }: ChangeUserRoleRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<ChangeUserRoleResponse>, ChangeUserRoleRequest>(
    adminPath.changeUserRole,
    {
      email,
      role,
    },
  );

  return res;
}

/**
 * [Admin] 유저 삭제 API (POST)
 *
 * `id` 유저 아이디 [**number**]
 */
export async function deleteUser({ id }: DeleteUserRequest) {
  const res = await axiosInstance.post<AxiosResponse<DeleteUserResponse>>(`${adminPath.deleteUser}/${id}`, {});

  return res;
}

/**
 * [Admin] 사이트 유저 수 API (GET)
 */
export async function getNumOfSiteUsers() {
  const res = await axiosInstance.get<GetNumOfSiteUsersResponse>(adminPath.numOfSiteUsers);

  return res;
}

/**
 * [Admin] 사이트 유저 검색 API (GET)
 *
 * `type` 검색 유형 [**email**, **fullName**, **membership**]
 *
 * `content` 검색 값 [**email** | **fullName** : string, **membership** : 'BASIC' | 'PREMIUM']
 *
 */
export async function searchSiteUser({ type, content }: SearchSiteUserRequest) {
  const res = await axiosInstance.get<SearchSiteUserResponse>(adminPath.searchSiteUser, {
    params: {
      type,
      content,
    },
  } as SearchSiteUserRequestConfig);

  return res;
}

export async function createNotice({ title, content }: CreateNoticeRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<CreateNoticeResponse>, CreateNoticeRequest>(
    adminPath.createNotice,
    {
      title,
      content,
    },
  );

  return res;
}

export const adminPath = {
  sendAdminAuthEmail: `/api/admin/email`,
  adminEmailVerify: `/api/admin/email/verify`,
  siteUsers: `/api/admin/user/list`,
  changeUserRole: `/api/admin/user/role`,
  deleteUser: `/api/admin/user/delete`,
  numOfSiteUsers: `/api/admin/user/list/length`,
  searchSiteUser: `/api/admin/user/list/search`,
  createNotice: `/api/admin/notice/save`,
  deleteNotice: (id?: number) => `/api/admin/notice/delete/${id ?? ':id'}`,
  updateNotice: `/api/admin/notice/update`,
} as const;
