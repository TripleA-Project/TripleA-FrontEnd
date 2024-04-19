import { API_ROUTE_PATH } from '@/constants/routePath';
import { DeleteNoticeResponse } from '@/interfaces/Dto/Admin/DeleteNoticeDto';
import { notice } from '@/mocks/db/notice';
import { getURL } from '@/util/url';
import { HttpStatusCode } from 'axios';
import { DefaultBodyType, HttpResponse, http } from 'msw';

export const deleteNotice = http.post<{ id: string }, DefaultBodyType, DeleteNoticeResponse>(
  getURL(API_ROUTE_PATH.ADMIN.NOTICE.DELETE_NOTICE()),
  async ({ params }) => {
    const id = params.id;

    const targetNoiceIndex = notice.findIndex((notice) => notice.id === Number(id));
    if (targetNoiceIndex === -1)
      return HttpResponse.json(
        {
          status: HttpStatusCode.NotFound,
          msg: '게시글을 찾을 수 없습니다.',
        },
        { status: HttpStatusCode.NotFound },
      );

    notice.splice(targetNoiceIndex, 1);

    return HttpResponse.json(
      {
        status: HttpStatusCode.Ok,
        msg: '성공',
        data: '공지사항 삭제 완료',
      },
      { status: HttpStatusCode.Ok },
    );
  },
);
