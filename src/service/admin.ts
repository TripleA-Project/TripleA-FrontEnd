import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';
import { AdminEmailAuthResponse } from '@/interfaces/Dto/Admin/AdminEmailAuthDto';
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
import { API_ROUTE_PATH } from '@/constants/routePath';

/**
 * [Admin] 관리자 인증 메일 발송 API (POST)
 */
export async function sendAdminAuthEmail() {
  const res = await axiosInstance.post<any, AxiosResponse<AdminEmailAuthResponse>>(
    API_ROUTE_PATH.ADMIN.AUTH.SEND_ADMIN_AUTH_EMAIL,
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
    API_ROUTE_PATH.ADMIN.AUTH.ADMIN_EMAIL_VERIFY,
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
  const res = await axiosInstance.get<GetSiteUsersResponse>(API_ROUTE_PATH.ADMIN.GET_SITE_USERS);

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
    API_ROUTE_PATH.ADMIN.MANAGE_USER.CHANGE_USER_ROLE,
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
  const res = await axiosInstance.post<AxiosResponse<DeleteUserResponse>>(
    API_ROUTE_PATH.ADMIN.MANAGE_USER.DELETE_USER(id),
    {},
  );

  return res;
}

/**
 * [Admin] 사이트 유저 수 API (GET)
 */
export async function getNumOfSiteUsers() {
  const res = await axiosInstance.get<GetNumOfSiteUsersResponse>(API_ROUTE_PATH.ADMIN.GET_SITE_USERS_NUMS);

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
  const res = await axiosInstance.get<SearchSiteUserResponse>(API_ROUTE_PATH.ADMIN.SEARCH, {
    params: {
      type,
      content,
    },
  } as SearchSiteUserRequestConfig);

  return res;
}
