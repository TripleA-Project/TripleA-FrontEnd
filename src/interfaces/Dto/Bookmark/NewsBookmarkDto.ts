import { type APIResponse } from '../Core';

// 뉴스 북마크 추가
export interface AddNewsBookmarkParam {
  id: number;
}

export interface AddNewsBookmarkResponse extends APIResponse {}

// 뉴스 북마크 삭제
export interface DeleteNewsBookmarkParam {
  id: number;
}

export interface DeleteNewsBookmarkResponse extends APIResponse {}
