import { type APIResponse } from '../Core';
import { type CategoryPayload } from './Common';

// 관심 카테고리 조회
export interface GetLikeCategoryResponse extends APIResponse<CategoryPayload> {}

// 관심 카테고리 생성
export interface LikeCategoryParam {
  id: number;
}

export interface LikeCategoryResponse extends APIResponse {}

// 관심 카테고리 삭제
export interface DisLikeCategoryParam {
  id: number;
}

export interface DisLikeCategoryResponse extends APIResponse {}
