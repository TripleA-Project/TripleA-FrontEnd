import TripleANoticeEditor from '@/components/Editor/Notice/TripleANoticeEditor';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NoticeViewPageProps {
  params: {
    articleId: string;
  };
}

export const metadata: Metadata = {
  title: 'Triple A | 공지사항 수정',
  description: 'Triple A | 공지사항 수정',
};

export default function NoticeModifyPage({ params }: NoticeViewPageProps) {
  // TODO : 서버api를 통해 받은 데이터로 initialState 생성
  const initialEditorState = '';

  return (
    <div className="box-border px-4">
      <TripleANoticeEditor initialEditorState={initialEditorState} />
      <ToastContainer position="bottom-center" newestOnTop={true} />
    </div>
  );
}
