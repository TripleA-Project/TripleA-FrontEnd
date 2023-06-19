import { axiosInstance } from './axios';
import {
  type LatestNewsRequestConfig,
  type LatestNewsSearchParam,
  type LatestNewsResponse,
  type NewsDetailParam,
  type NewsDetailResponse,
  type SearchSymbolNewsSearchParam,
  type SearchSymbolNewsRequestConfig,
  type SearchSymbolNewsResponse,
  type SearchCategoryNewsParam,
  type SearchCategoryNewsSearchParam,
  type SearchCategoryNewsResponse,
  type SearchCategoryNewsRequestConfig,
  type SearchKeywordNewsSearchParam,
  type SearchKeywordNewsRequestConfig,
  type SearchKeywordNewsResponse,
  type AINewsAnalysisParam,
  type AINewsAnalysisResponse,
} from '@/interfaces/Dto/News';
import {
  type GetNewsHistoryRequestConfig,
  type GetNewsHistorySearchParam,
  type GetNewsHistroyResponse,
} from '@/interfaces/Dto/History';

/**
 * 최신 뉴스 조회 API (GET) - Pagination
 *
 * `page` 페이지 번호 [**number**] - optional
 *
 * 기본 **0**
 *
 * `size` 뉴스 개수 [**number**] - optional
 *
 * 기본 **10**
 */
export async function latestNews({ page = 0, size = 10 }: LatestNewsSearchParam = {}) {
  const latestNewsResponse = await axiosInstance.get<LatestNewsResponse>('/api/news/latest', {
    params: {
      page,
      size,
    },
  } as LatestNewsRequestConfig);

  return latestNewsResponse;
}

/**
 * 상세 뉴스 조회 API (GET)
 *
 * `id` 뉴스 id [**number**]
 */
export async function getNewsDetail({ id }: NewsDetailParam) {
  const getNewsDetailResponse = await axiosInstance.get<NewsDetailResponse>(`/api/news/${id}`);

  return getNewsDetailResponse;
}

/**
 * 심볼 뉴스 검색 API (GET) - Pagination
 *
 * `symbol` 심볼 이름 [**string**]
 *
 * `page` 페이지 번호 [**number**] - optional (기본 **0**)
 *
 * `size` 뉴스 개수 [**number**] - optional (기본 **10**)
 */
export async function searchSymbolNews({ symbol, page = 0, size = 10 }: SearchSymbolNewsSearchParam) {
  const searchSymbolNewsResponse = await axiosInstance.get<SearchSymbolNewsResponse>('/api/news', {
    params: {
      symbol,
      page,
      size,
    },
  } as SearchSymbolNewsRequestConfig);
  return searchSymbolNewsResponse;
}

/**
 * 카테고리 뉴스 검색 API (GET) - Pagination
 *
 * `categoryId` 카테고리 id [**number**]
 *
 * `page` 페이지 번호 [**number**] - optional (기본 **0**)
 *
 * `size` 뉴스 개수 [**number**] - optional (기본 **10**)
 */
export async function searchCategoryNews({
  categoryId,
  page = 0,
  size = 10,
}: SearchCategoryNewsParam & SearchCategoryNewsSearchParam) {
  const searchCategoryNewsResponse = await axiosInstance.get<SearchCategoryNewsResponse>(
    `/api/news/category/${categoryId}`,
    {
      params: {
        page,
        size,
      },
    } as SearchCategoryNewsRequestConfig,
  );

  return searchCategoryNewsResponse;
}

/**
 * 키워드 뉴스 검색 API (GET) - Pagination
 *
 * `keyword` 키워드 [**string**]
 *
 * `page` 페이지 번호 [**number**] - optional (기본 **0**)
 *
 * `size` 뉴스 개수 [**number**] - optional (기본 **10**)
 */
export async function searchKeywordNews({ keyword, page = 0, size = 10 }: SearchKeywordNewsSearchParam) {
  const searchKeywordNewsResponse = await axiosInstance.get<SearchKeywordNewsResponse>('/api/news/keyword', {
    params: {
      keyword,
      page,
      size,
    },
  } as SearchKeywordNewsRequestConfig);

  return searchKeywordNewsResponse;
}

/**
 * 뉴스 히스토리(내가 본 뉴스) 조회 API (GET)
 *
 * `year` 년도 [**number**] - YYYY
 *
 * `month` 월 [**number**] - D
 */
export async function getNewsHistory({ year, month }: GetNewsHistorySearchParam) {
  const getNewsHistoryResponse = await axiosInstance.get<GetNewsHistroyResponse>('/api/history', {
    params: {
      year,
      month,
    },
  } as GetNewsHistoryRequestConfig);

  return getNewsHistoryResponse;
}

/**
 * AI 뉴스 분석 API (GET)
 *
 * `id` 뉴스 id [**number**]
 */
export async function getAINewsAnalysis({ id }: AINewsAnalysisParam) {
  const getAINewsAnalysisResponse = await axiosInstance.get<AINewsAnalysisResponse>(`/api/news/${id}/ai`);

  return getAINewsAnalysisResponse;
}
