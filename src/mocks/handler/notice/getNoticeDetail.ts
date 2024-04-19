import { API_ROUTE_PATH } from '@/constants/routePath';
import { GetNoticeDetailResponse } from '@/interfaces/Dto/Notice/GetNoticeDeatilDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, http } from 'msw';

export const getNoticeDetail = http.get<{ id: string }, DefaultBodyType, GetNoticeDetailResponse>(
  getURL(API_ROUTE_PATH.NOTICE.GET_NOTICE_DETAIL()),
  async ({ params }) => {
    const noticeId = Number(params.id);

    const targetNotice = notice.find((notice) => notice.id === noticeId);

    if (!targetNotice) {
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: 'badRequest',
        },
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: targetNotice,
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  },
);
