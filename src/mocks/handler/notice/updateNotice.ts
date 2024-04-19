import { API_ROUTE_PATH } from '@/constants/routePath';
import { UpdateNoticeRequest, UpdateNoticeResponse } from '@/interfaces/Dto/Admin/UpdateNoticeDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { HttpResponse, PathParams, http } from 'msw';

export const updateNotice = http.post<PathParams, UpdateNoticeRequest, UpdateNoticeResponse>(
  getURL(API_ROUTE_PATH.ADMIN.NOTICE.UPDATE_NOTICE),
  async ({ request }) => {
    const { id, title, content } = await request.json();

    const targetNotice = notice.find((notice) => notice.id === id);

    if (!targetNotice)
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '게시글을 찾을 수 없습니다.',
        },
        { status: HttpStatusCode.NotFound },
      );

    targetNotice.title = title;
    targetNotice.content = content;

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '공지사항 수정완료',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
