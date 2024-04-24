import NoticeList from '@/app/notice/_components/NoticeList';
import { getNoticeList } from '@/service/notice';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 공지사항 목록',
  description: 'Triple A 관리자 | 공지사항 목록',
};

export default async function AdminNoticePage() {
  const noticeListResponse = await getNoticeList();

  const list = noticeListResponse.data.data?.length ? [...noticeListResponse.data.data].reverse() : [];

  return (
    <div className="box-border px-4">
      <div className="my-6 bg-white" />
      <NoticeList noticeList={list} />
    </div>
  );
}
