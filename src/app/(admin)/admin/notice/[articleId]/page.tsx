import TripleANoticeViewer from '@/components/Editor/Notice/Viewer/TripleANoticeViewer';
import { getNoticeDetail } from '@/service/notice';
import { Metadata } from 'next';
import DeleteNoticeModal from '@/components/Modal/DeleteNoticeModal';
import NoticeDetailTitle from '@/app/notice/_components/NoticeDetailTitle';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NoticeViewPageProps {
  params: {
    articleId: string;
  };
}

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 공지사항 상세 보기',
  description: 'Triple A 관리자 | 공지사항 상세 보기',
};

function isValidParams({ params }: NoticeViewPageProps) {
  const numArticleId = Number(params.articleId);

  if (Number.isNaN(numArticleId) || params.articleId.includes('.') || numArticleId < 0) return false;

  return true;
}

export default async function NoticeDetailViewPage({ params }: NoticeViewPageProps) {
  try {
    if (!isValidParams({ params })) {
      throw new Error('Not Found Notice');
    }

    const noticeDetailResponse = await getNoticeDetail({ id: Number(params.articleId) });
    const initialEditorState = noticeDetailResponse.data.data?.content ?? '';

    if (!noticeDetailResponse?.data.data) {
      throw new Error('Not Found Notice');
    }

    return (
      <div className="box-border px-4">
        <div className="mt-6" />
        <NoticeDetailTitle title={noticeDetailResponse.data.data.title} />
        <div className="mt-4" />
        <div className="border">
          <div className="p-4">
            <TripleANoticeViewer initialEditorState={initialEditorState} />
          </div>
        </div>
        <DeleteNoticeModal />
      </div>
    );
  } catch (error) {
    return (
      <div className="box-border px-4">
        <div className="flex h-[400px] w-full items-center justify-center font-bold">게시글을 찾을 수 없습니다.</div>
      </div>
    );
  }
}
