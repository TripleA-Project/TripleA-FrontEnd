import { type APIResponse } from '../Core';
import { type CategoryPayload } from './Common';

// 전체 카테고리 조회
export interface GetAllCategoryResponse extends APIResponse<CategoryPayload> {}
