import TripleANoticeViewer from '@/components/Editor/Notice/Viewer/TripleANoticeViewer';
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
  title: 'Triple A | 공지사항 상세 보기',
  description: 'Triple A | 공지사항 상세 보기',
};

export default function NoticeDetailViewPage({ params }: NoticeViewPageProps) {
  // TODO : 서버api를 통해 받은 데이터로 initialState 생성
  const initialEditorState = ``;

  return (
    <div className="box-border px-4">
      <TripleANoticeViewer initialEditorState={initialEditorState} />
      <ToastContainer position="bottom-center" newestOnTop={true} />
    </div>
  );
}
