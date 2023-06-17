import { type AxiosRequestConfig } from 'axios';
import { type APIResponse } from '../Core';
import { type CategoryPayload } from './Common';

// 카테고리 검색
export interface SearchCategorySearchParam {
  search: string;
}

export interface SearchCategoryRequestConfig extends AxiosRequestConfig {
  params: SearchCategorySearchParam;
}

export interface SearchCategoryResponse extends APIResponse<CategoryPayload> {}
