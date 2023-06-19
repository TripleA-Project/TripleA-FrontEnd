import { type AxiosRequestConfig } from 'axios';

export interface APIResponse<T = string> {
  status: number;
  msg: string;
  data?: T;
}

export interface PaginationSearchParam {
  size?: number;
  page?: number;
}

export interface PaginationRequestConfig<T = PaginationSearchParam, D = any> extends AxiosRequestConfig<D> {
  params: T;
}

export interface PaginationPayload {
  nextPage?: number;
}

export interface Pagination<T> extends APIResponse<T & PaginationPayload> {}
