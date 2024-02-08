import { AxiosRequestConfig } from 'axios';
import { APIResponse } from '../Core';
import { SiteUser } from './GetSiteUsersDto';

export type SearchType = Extract<keyof SiteUser, 'email' | 'fullName' | 'membership'>;

export type SearchSiteUserRequest<T extends SearchType = SearchType> = T extends SearchType
  ? T extends 'email'
    ? { type: 'email'; content: SiteUser['email'] }
    : T extends 'fullName'
    ? { type: 'fullName'; content: SiteUser['fullName'] }
    : T extends 'membership'
    ? { type: 'membership'; content: SiteUser['membership'] }
    : never
  : never;

export interface SearchSiteUserRequestConfig<T = SearchSiteUserRequest, D = any> extends AxiosRequestConfig<D> {
  params: T;
}

export type SearchSiteUserPayload = SiteUser[];

export interface SearchSiteUserResponse extends APIResponse<SearchSiteUserPayload> {}
