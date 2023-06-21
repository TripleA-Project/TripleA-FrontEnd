import { type Pagination, type PaginationRequestConfig, type PaginationSearchParam } from '../Core';
import { type NewsPayload } from './Common';

// 카테고리 뉴스 검색
export interface SearchCategoryNewsParam {
  categoryId: number;
}

export interface SearchCategoryNewsSearchParam extends PaginationSearchParam {}

export interface SearchCategoryNewsRequestConfig extends PaginationRequestConfig<SearchCategoryNewsSearchParam> {}

export interface SearchCategoryNewsResponse extends Pagination<NewsPayload & { search: string }> {}
