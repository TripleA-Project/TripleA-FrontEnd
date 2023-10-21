import TripleANoticeEditor from '@/components/Editor/Notice/TripleANoticeEditor';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 공지사항 작성',
  description: 'Triple A | 공지사항 작성',
};

export default function NoticePostPage() {
  return (
    <div className="box-border px-4">
      <TripleANoticeEditor />
      <ToastContainer position="bottom-center" newestOnTop={true} />
    </div>
  );
}
