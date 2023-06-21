import { axiosInstance } from './axios';
import {
  type AddNewsBookmarkParam,
  type AddNewsBookmarkResponse,
  type DeleteNewsBookmarkParam,
  type DeleteNewsBookmarkResponse,
} from '@/interfaces/Dto/Bookmark';

/**
 * 북마크(뉴스) 생성 API (POST)
 *
 * `id` 뉴스 id [**number**]
 */
export async function addNewsBookmark({ id }: AddNewsBookmarkParam) {
  const addNewsBookmarkResponse = await axiosInstance.post<AddNewsBookmarkResponse>(`/api/news/${id}`);

  return addNewsBookmarkResponse;
}

/**
 * 북마크(뉴스) 취소 API (DELETE)
 *
 * `id` 뉴스 id [**number**]
 */
export async function deleteNewsBookmark({ id }: DeleteNewsBookmarkParam) {
  const deleteNewsBookmarkResponse = await axiosInstance.delete<DeleteNewsBookmarkResponse>(`/api/news/${id}`);

  return deleteNewsBookmarkResponse;
}
