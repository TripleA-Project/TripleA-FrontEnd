import { type Pagination, type PaginationRequestConfig, type PaginationSearchParam } from '../Core';
import { type NewsPayload } from './Common';

// 키워드 뉴스 검색
export interface SearchKeywordNewsSearchParam extends PaginationSearchParam {
  keyword: string;
}

export interface SearchKeywordNewsRequestConfig extends PaginationRequestConfig<SearchKeywordNewsSearchParam> {}

export interface SearchKeywordNewsResponse extends Pagination<NewsPayload> {}
