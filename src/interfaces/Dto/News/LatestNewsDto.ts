import { type Pagination, type PaginationRequestConfig, type PaginationSearchParam } from '../Core';
import { type NewsPayload } from './Common';

// 최신 뉴스
export interface LatestNewsSearchParam extends PaginationSearchParam {}

export interface LatestNewsRequestConfig extends PaginationRequestConfig {}

export interface LatestNewsResponse extends Pagination<NewsPayload> {}
