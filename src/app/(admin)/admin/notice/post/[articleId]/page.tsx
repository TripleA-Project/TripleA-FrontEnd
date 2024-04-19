import TripleANoticeEditor from '@/components/Editor/Notice/TripleANoticeEditor';
import { Metadata } from 'next';
import NoticeForm from '@/components/Form/NoticeForm';
import { getNoticeDetail } from '@/service/notice';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NoticeModifyPageProps {
  params: {
    articleId: string;
  };
}

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 공지사항 수정',
  description: 'Triple A 관리자 | 공지사항 수정',
};

function isValidParams({ params }: NoticeModifyPageProps) {
  const numArticleId = Number(params.articleId);

  if (Number.isNaN(numArticleId) || params.articleId.includes('.') || numArticleId < 0) return false;

  return true;
}

export default async function NoticeModifyPage({ params }: NoticeModifyPageProps) {
  try {
    if (!isValidParams({ params })) {
      throw new Error('Not Found Notice');
    }

    const noticeDetailResponse = await getNoticeDetail({ id: Number(params.articleId) });

    const title = noticeDetailResponse.data.data?.title;
    const initialEditorState = noticeDetailResponse.data.data?.content;

    return (
      <div className="box-border px-4 pb-4">
        <div className="sticky top-[52px] z-[5] bg-white pb-5 pt-4">
          <NoticeForm action="change" noticeId={Number(params.articleId)} title={title} content={initialEditorState} />
        </div>
        <TripleANoticeEditor initialEditorState={initialEditorState} />
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
