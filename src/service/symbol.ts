import { axiosInstance } from './axios';
import {
  type GetRecommandSymbolResponse,
  type GetLikeSymbolResponse,
  type GetSymbolRequestConfig,
  type GetSymbolResponse,
  type GetSymbolSearchParam,
  type SearchSymbolSearchParam,
  type SearchSymbolResponse,
  type SearchSymbolRequestConfig,
  type LikeSymbolParam,
  type LikeSymbolResponse,
  type DisLikeSymbolParam,
  type DisLikeSymbolResponse,
} from '@/interfaces/Dto/Symbol';

/**
 * 추천 심볼 조회 API (GET)
 *
 * 전체 사용자의 관심 심볼 수가 많은 순으로 10개
 */
export async function getRecommandSymbol() {
  const getRecommandSymbolResponse = await axiosInstance.get<GetRecommandSymbolResponse>('/api/symbol/recommand');

  return getRecommandSymbolResponse;
}

/**
 * 관심 심볼 조회 API (GET)
 */
export async function getLikeSymbol() {
  const getLikeSymbolResponse = await axiosInstance.get<GetLikeSymbolResponse>('/api/auth/symbol/like');

  return getLikeSymbolResponse;
}

export async function getSymbol({ symbol }: GetSymbolSearchParam) {
  const getSymbolResponse = await axiosInstance.get<GetSymbolResponse>('/api/symbol', {
    params: {
      symbol,
    },
  } as GetSymbolRequestConfig);

  return getSymbolResponse;
}

/**
 * 심볼 검색 API (GET)
 *
 * `symbol` 검색할 심볼 문자열 [**string**]
 */
export async function searchSymbol({ symbol }: SearchSymbolSearchParam) {
  const searchSymbolResponse = await axiosInstance.get<SearchSymbolResponse>('/api/symbol/search', {
    params: {
      symbol,
    },
  } as SearchSymbolRequestConfig);

  return searchSymbolResponse;
}

/**
 * 관심 심볼 생성 API (GET)
 *
 * `id` 심볼 id [**number**]
 */
export async function likeSymbol({ symbol }: LikeSymbolParam) {
  const likeSymbolResponse = await axiosInstance.get<LikeSymbolResponse>(`/api/auth/symbol?symbol=${symbol}`);

  return likeSymbolResponse;
}

/**
 * 관심 심볼 취소 API (DELETE)
 *
 * `id` 심볼 id [**number**]
 */
export async function disLikeSymbol({ id }: DisLikeSymbolParam) {
  const disLikeSymbolResponse = await axiosInstance.delete<DisLikeSymbolResponse>(`/api/auth/symbol/${id}`);

  return disLikeSymbolResponse;
}
