import { type Pagination, type PaginationRequestConfig, type PaginationSearchParam } from '../Core';
import { type NewsPayload } from './Common';

// 심볼 뉴스 검색
export interface SearchSymbolNewsSearchParam extends PaginationSearchParam {
  symbol: string;
}

export interface SearchSymbolNewsRequestConfig extends PaginationRequestConfig<SearchSymbolNewsSearchParam> {}

export interface SearchSymbolNewsResponse extends Pagination<NewsPayload> {}
