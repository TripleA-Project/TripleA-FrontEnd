import { axiosInstance } from './axios';
import {
  type GetAllCategoryResponse,
  type SearchCategorySearchParam,
  type SearchCategoryRequestConfig,
  type SearchCategoryResponse,
  type GetLikeCategoryResponse,
  type LikeCategoryParam,
  type LikeCategoryResponse,
  type DisLikeCategoryParam,
  type DisLikeCategoryResponse,
} from '@/interfaces/Dto/Category';

/**
 * 모든 카테고리 조회 API (GET)
 */
export async function getAllCategory() {
  const getAllCategoryResponse = await axiosInstance.get<GetAllCategoryResponse>('/api/categories');

  return getAllCategoryResponse;
}

/**
 * 카테고리 검색 API (GET)
 *
 * `search` 검색할 카테고리 문자열 [**string**]
 */
export async function searchCategory({ search }: SearchCategorySearchParam) {
  const searchCategoryResponse = await axiosInstance.get<SearchCategoryResponse>('/api/category', {
    params: {
      search,
    },
  } as SearchCategoryRequestConfig);

  return searchCategoryResponse;
}

/**
 * 관심 카테고리 조회 API (GET)
 */
export async function getLikeCategory() {
  const getLikeCategoryResponse = await axiosInstance.get<GetLikeCategoryResponse>('/api/category/like');

  return getLikeCategoryResponse;
}

/**
 * 관심 카테고리 등록 API (POST)
 *
 * `id` 카테고리 id [**number**]
 */
export async function likeCategory({ id }: LikeCategoryParam) {
  const likeCategoryResponse = await axiosInstance.post<LikeCategoryResponse>(`/api/category/${id}`);

  return likeCategoryResponse;
}

/**
 * 관심 카테고리 취소 API (DELETE)
 *
 * `id` 카테고리 id [**number**]
 */
export async function disLikeCategory({ id }: DisLikeCategoryParam) {
  const disLikeCategoryResponse = await axiosInstance.delete<DisLikeCategoryResponse>(`/api/category/${id}`);

  return disLikeCategoryResponse;
}
