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
import {
  RegisterFreeTrialRequest,
  RegisterFreeTrialResponse,
} from '@/interfaces/Dto/Admin/free-trial/RegisterFreeTrialDto';
import {
  UpdateFreeTrialDateRequest,
  UpdateFreeTrialDateResponse,
} from '@/interfaces/Dto/Admin/free-trial/UpdateFreeTrialDateDto';
import {
  DeleteFreeTrialUserRequest,
  DeleteFreeTrialUserResponse,
} from '@/interfaces/Dto/Admin/free-trial/DeleteFreeTrialUserDto';

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

// 무료체험

/**
 * [Admin] 무료체험 등록 (POST)
 *
 * `id` 무료체험 등록할 유저의 아이디 [**number**]
 *
 * `endDate` 무료체험 종료 일자 문자 포멧 [**"YYYY-MM-DD"**]
 */
export async function registerFreeTrial({ id, endDate }: RegisterFreeTrialRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<RegisterFreeTrialResponse>, RegisterFreeTrialRequest>(
    API_ROUTE_PATH.ADMIN.FREE_TRIAL.REGISTER_FERR_TRIAL,
    {
      id,
      endDate,
    },
  );

  return res;
}

/**
 * [Admin] 무료체험 수정 (POST)
 *
 * `id` 무료체험 등록할 유저의 아이디 [**number**]
 *
 * `endDate` 무료체험 종료 일자 문자 포멧 [**"YYYY-MM-DD"**]
 */
export async function updateFreeTrialDate({ id, endDate }: UpdateFreeTrialDateRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<UpdateFreeTrialDateResponse>, UpdateFreeTrialDateRequest>(
    API_ROUTE_PATH.ADMIN.FREE_TRIAL.UPDATE_FREE_TRIAL_DATE,
    {
      id,
      endDate,
    },
  );

  return res;
}

/**
 * [Admin] 무료체험 삭제 (DELETE)
 *
 * `id` 무료체험을 해제할 유저의 아이디 [**number**]
 *
 */
export async function deleteFreeTrialUser({ id }: DeleteFreeTrialUserRequest) {
  const res = await axiosInstance.delete<DeleteFreeTrialUserResponse>(
    API_ROUTE_PATH.ADMIN.FREE_TRIAL.DELETE_FREE_TRIAL_USER(id),
  );

  return res;
}
