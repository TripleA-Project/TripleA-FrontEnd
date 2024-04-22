import { getNoticeList } from '@/service/notice';
import { Metadata } from 'next';
import NoticeList from './_components/NoticeList';
import { AxiosError, HttpStatusCode } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';
import NoticeUnauthorized from './_components/NoticeUnauthorized';
import NoticeInternalServerError from './_components/NoticeInternelError';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 공지사항',
  description: 'Triple A | 공지사항',
};

export default async function NoticePage() {
  try {
    const noticeListResponse = await getNoticeList();

    const list = noticeListResponse.data.data?.length ? [...noticeListResponse.data.data].reverse() : [];

    return (
      <div className="box-border px-4">
        <div className="my-6 bg-white" />
        <NoticeList noticeList={list} />
      </div>
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>;

      if (response?.data.status === HttpStatusCode.Unauthorized) {
        return (
          <NoticeUnauthorized
            redirectTo={{
              domain: 'noticeList',
            }}
          />
        );
      }
    }

    return <NoticeInternalServerError />;
  }
}
