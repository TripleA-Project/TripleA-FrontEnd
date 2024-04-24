'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import NoticeModalWrapper from './NoticeModalWrapper';
import { deleteNotice } from '@/service/notice';
import Button from '@/components/Button/Button';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { usePathname } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/routePath';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressWorkingViewProps,
} from '@/components/ProgressView';
import Link from 'next/link';

function DeleteNoticeModal() {
  const { modal } = useModal('admin:deleteNotice');

  return modal.open && modal.modalType === 'admin:deleteNotice' && typeof window !== 'undefined'
    ? createPortal(
        <NoticeModalWrapper>
          <DeleteNoticeModalContent />
        </NoticeModalWrapper>,
        document.body,
      )
    : null;
}

export default DeleteNoticeModal;

const DeleteNoticeModalContent = () => {
  const { modal, closeModal } = useModal('admin:deleteNotice');

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4">
      <ProgressView taskList={[() => deleteNotice({ id: modal.data!.noticeId })]} onClose={closeModal}>
        <ProgressView.Idle>{DeleteNoticeProgressIdle}</ProgressView.Idle>
        <ProgressView.Working>{DeleteNoticeProgressWorking}</ProgressView.Working>
        <ProgressView.Done>{DeleteNoticeProgressDone}</ProgressView.Done>
      </ProgressView>
    </div>
  );
};

/* progress view */

function DeleteNoticeProgressIdle({ runTasks, onClose }: ProgressIdleViewProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">공지사항을 삭제 하시겠습니까?</span>
      <div className="flex gap-2">
        <Button className="h-6 w-20 px-2 py-1 text-sm" bgColorTheme="orange" textColorTheme="white" onClick={runTasks}>
          예
        </Button>
        <Button className="h-6 w-20 px-2 py-1 text-sm" bgColorTheme="none" textColorTheme="black" onClick={onClose}>
          취소
        </Button>
      </div>
    </div>
  );
}

function DeleteNoticeProgressWorking(props: ProgressWorkingViewProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <MuiSpinner size={16} />
    </div>
  );
}

function DeleteNoticeProgressDone({ onClose }: ProgressDoneViewProps) {
  const pathname = usePathname();

  const prefix = pathname.startsWith('/admin') ? '/admin' : '';
  const href = prefix + ROUTE_PATH.NOTICE.LIST;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">공지사항 삭제를 완료 했습니다.</span>
      <Link href={href} onClick={onClose}>
        <Button className="h-fit w-fit px-3 py-2 text-sm" bgColorTheme="orange" textColorTheme="white">
          공지사항 목록 보기
        </Button>
      </Link>
    </div>
  );
}
