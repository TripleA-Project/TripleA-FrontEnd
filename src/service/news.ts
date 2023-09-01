import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { axiosInstance } from './axios';
import { cloneDeep } from 'lodash';
import {
  type GetNewsByIdSearchParam,
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
  type SearchKeywordNewsSearchParam,
  type SearchKeywordNewsRequestConfig,
  type SearchKeywordNewsResponse,
  type AINewsAnalysisParam,
  type AINewsAnalysisRequest,
  type AINewsAnalysisResponse,
  type GetNewsByIdResponse,
  type CollapseNews,
  type CollapseNewsPayload,
  AINewsAnalysisDemoResponse,
  AINewsAnalysisDemoRequest,
} from '@/interfaces/Dto/News';
import {
  type GetNewsHistoryRequestConfig,
  type GetNewsHistorySearchParam,
  type GetNewsHistroyResponse,
} from '@/interfaces/Dto/History';
import { type Pagination } from '@/interfaces/Dto/Core';

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
 * 최신 뉴스 조회 API - 심볼 병합 (GET) - Pagination
 *
 * 뉴스 아이디가 같은 경우 심볼을 합쳐서 심볼리스트로 반환
 *
 * moya API 에서의 뉴스 조회 응답데이터가 변경되지 않는 이상,
 *
 * 메인 화면에서만 유의미하게 적용할 수 있어 적용하지는 않음
 *
 * (추후 확장을 고려하여 삭제하지 않고 남겨둠)
 *
 * `page` 페이지 번호 [**number**] - optional
 *
 * 기본 **0**
 *
 * `size` 뉴스 개수 [**number**] - optional
 *
 * 기본 **10**
 */
export async function collapseLatestNews({ page = 10, size = 10 }: LatestNewsSearchParam = {}) {
  try {
    const latestNewsResponse = await latestNews({ page, size });

    if (latestNewsResponse.data.status === HttpStatusCode.Unauthorized || !latestNewsResponse.data.data?.news?.length) {
      return {
        ...latestNewsResponse,
        data: {
          status: latestNewsResponse.data.status,
          msg: latestNewsResponse.data.msg,
          data: {
            news: [] as CollapseNews[],
            nextPage: latestNewsResponse.data.data?.nextPage,
          },
        },
      } as AxiosResponse<Pagination<CollapseNewsPayload>>;
    }

    const originNewsList = cloneDeep(latestNewsResponse.data.data.news);

    const collapseNewsList = originNewsList.reduce((result, currentNewsItem) => {
      const {
        symbol: currentNewsSymbol,
        companyName: currentNewsCompanyName,
        logo: currentNewsLogo,
        ...currentNews
      } = currentNewsItem;

      const sameIdNews = result.find((resultNews) => resultNews.newsId === currentNewsItem.newsId);

      if (!sameIdNews) {
        result.push({
          ...currentNews,
          symbolList: [{ symbol: currentNewsSymbol, companyName: currentNewsCompanyName, logo: currentNewsLogo }],
        });

        return result;
      }

      sameIdNews.symbolList.push({
        symbol: currentNewsSymbol,
        companyName: currentNewsCompanyName,
        logo: currentNewsLogo,
      });

      return result;
    }, [] as CollapseNews[]);

    return {
      ...latestNewsResponse,
      data: {
        status: latestNewsResponse.data.status,
        msg: latestNewsResponse.data.msg,
        data: {
          nextPage: latestNewsResponse.data.data.nextPage,
          news: collapseNewsList,
        },
      },
    } as AxiosResponse<Pagination<CollapseNewsPayload>>;
  } catch (err) {
    throw err;
  }
}

/**
 * 상세 뉴스 조회 API (GET)
 *
 * `id` 뉴스 id [**number**]
 */
export async function getNewsDetail({ id }: NewsDetailParam) {
  const getNewsDetailResponse = await axiosInstance.get<NewsDetailResponse>(`/api/auth/news/${id}`);

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
    `/api/news/category/${categoryId}?page=${page}&size=${size}`,
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
 * `month` 월 [**number**] - M
 */
export async function getNewsHistory({ year, month }: GetNewsHistorySearchParam) {
  const getNewsHistoryResponse = await axiosInstance.get<GetNewsHistroyResponse>('/api/auth/history', {
    params: {
      year,
      month,
    },
  } as GetNewsHistoryRequestConfig);

  return getNewsHistoryResponse;
}

/**
 * 뉴스아이디로 뉴스 데이터 조회 API (GET) - Moya
 *
 * `id` 뉴스 아이디 [**number**]
 */
export async function getNewsById({ id }: GetNewsByIdSearchParam) {
  const getNewsByIdResponse = await axios.get<GetNewsByIdResponse>(
    `https://api.moya.ai/globalnews?id=${id}&token=${process.env.NEXT_PUBLIC_TOKEN}`,
  );

  return getNewsByIdResponse;
}

/**
 * AI 뉴스 분석 API (POST)
 *
 * `id` 뉴스 id [**number**]
 *
 * `summary` [**string**]
 */
export async function getAINewsAnalysis({ id, summary }: AINewsAnalysisParam & AINewsAnalysisRequest) {
  const getAINewsAnalysisResponse = await axiosInstance.post<
    any,
    AxiosResponse<AINewsAnalysisResponse>,
    AINewsAnalysisRequest
  >(`/api/auth/news/${id}/ai`, {
    summary,
  });

  return getAINewsAnalysisResponse;
}

export async function getAINewsAnalysisDemo({ id, summary }: AINewsAnalysisParam & AINewsAnalysisRequest) {
  const getAINewsAnalysisDemoResponse = await axios.get<AINewsAnalysisDemoResponse>(
    process.env.NEXT_PUBLIC_WISE_AI_URL!,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WISE_TOKEN}`,
      },
      params: {
        openai_api_key: process.env.NEXT_PUBLIC_OPENAI_KEY,
        id,
        article: summary,
      } as AINewsAnalysisDemoRequest,
    },
  );

  return getAINewsAnalysisDemoResponse;
}
