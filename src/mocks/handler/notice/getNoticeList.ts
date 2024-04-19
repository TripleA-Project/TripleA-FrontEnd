import { API_ROUTE_PATH } from '@/constants/routePath';
import { GetNoticeListResponse } from '@/interfaces/Dto/Notice/GetNoticeListDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, http } from 'msw';

export const getNoticeList = http.get<any, DefaultBodyType, GetNoticeListResponse>(
  getURL(API_ROUTE_PATH.NOTICE.GET_NOTICE_LIST),
  async () => {
    const noticeList = notice;

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: [...noticeList],
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
