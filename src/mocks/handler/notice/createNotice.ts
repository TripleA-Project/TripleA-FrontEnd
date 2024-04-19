import { API_ROUTE_PATH } from '@/constants/routePath';
import { CreateNoticeRequest, CreateNoticeResponse } from '@/interfaces/Dto/Admin/CreateNoticeDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const createNotice = http.post<PathParams, CreateNoticeRequest, CreateNoticeResponse>(
  getURL(API_ROUTE_PATH.ADMIN.NOTICE.CREATE_NOTICE),
  async ({ request }) => {
    const { title, content } = await request.json();

    const lastId = !notice.length ? 0 : Math.max(...notice.map((notice) => notice.id));

    notice.push({
      id: lastId + 1,
      title,
      content,
    });

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '공지사항 작성완료',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
