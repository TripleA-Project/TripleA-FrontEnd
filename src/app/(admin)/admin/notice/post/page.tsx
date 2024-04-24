import TripleANoticeEditor from '@/components/Editor/Notice/TripleANoticeEditor';
import NoticeForm from '@/components/Form/NoticeForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 공지사항 작성',
  description: 'Triple A 관리자 | 공지사항 작성',
};

export default function NoticePostPage() {
  return (
    <div className="box-border px-4 pb-4">
      <div className="sticky top-[52px] z-[5] bg-white pb-5 pt-4">
        <NoticeForm action="create" />
      </div>
      <TripleANoticeEditor />
    </div>
  );
}
