import { API_ROUTE_PATH } from '@/constants/routePath';
import { axiosInstance } from './axios';
import { GetNoticeListResponse } from '@/interfaces/Dto/Notice/GetNoticeListDto';
import { GetNoticeDetailRequest, GetNoticeDetailResponse } from '@/interfaces/Dto/Notice/GetNoticeDeatilDto';
import { UpdateNoticeRequest, UpdateNoticeResponse } from '@/interfaces/Dto/Admin/UpdateNoticeDto';
import { AxiosResponse } from 'axios';
import { DeleteNoticeRequest, DeleteNoticeResponse } from '@/interfaces/Dto/Admin/DeleteNoticeDto';
import { CreateNoticeRequest, CreateNoticeResponse } from '@/interfaces/Dto/Admin/CreateNoticeDto';

export async function getNoticeList() {
  const res = await axiosInstance.get<GetNoticeListResponse>(API_ROUTE_PATH.NOTICE.GET_NOTICE_LIST);

  return res;
}

export async function getNoticeDetail({ id }: GetNoticeDetailRequest) {
  const res = await axiosInstance.get<GetNoticeDetailResponse>(API_ROUTE_PATH.NOTICE.GET_NOTICE_DETAIL(id));

  return res;
}

export async function createNotice({ title, content }: CreateNoticeRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<CreateNoticeResponse>, CreateNoticeRequest>(
    API_ROUTE_PATH.ADMIN.NOTICE.CREATE_NOTICE,
    {
      title,
      content,
    },
  );

  return res;
}

export async function updateNotice({ id, title, content }: UpdateNoticeRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<UpdateNoticeResponse>, UpdateNoticeRequest>(
    API_ROUTE_PATH.ADMIN.NOTICE.UPDATE_NOTICE,
    {
      id,
      title,
      content,
    },
  );

  return res;
}

export async function deleteNotice({ id }: DeleteNoticeRequest) {
  const res = await axiosInstance.post<any, AxiosResponse<DeleteNoticeResponse>>(
    API_ROUTE_PATH.ADMIN.NOTICE.DELETE_NOTICE(id),
  );

  return res;
}
