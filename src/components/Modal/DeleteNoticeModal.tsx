'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import NoticeModalWrapper from './NoticeModalWrapper';
import { deleteNotice } from '@/service/notice';
import Button from '@/components/Button/Button';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/routePath';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressWorkingViewProps,
} from '@/components/ProgressView';
import { useEffect } from 'react';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';

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
  const { prefetch } = useRouter();

  const { modal, closeModal } = useModal('admin:deleteNotice');

  const onDone: NonNullable<ProgressDoneViewProps['onDone']> = () => {
    prefetch('/notice', { kind: PrefetchKind.FULL });
    prefetch('/admin/notice', { kind: PrefetchKind.FULL });
  };

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4">
      <ProgressView taskList={[() => deleteNotice({ id: modal.data!.noticeId })]} onDone={onDone} onClose={closeModal}>
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

function DeleteNoticeProgressDone({ completedTaskResult, failTaskResult, onDone, onClose }: ProgressDoneViewProps) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const prefix = pathname.startsWith('/admin') ? '/admin' : '';

  useEffect(() => {
    onDone && onDone({ completedTaskResult, failTaskResult });
  }, []); /* eslint-disable-line */

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">공지사항 삭제를 완료 했습니다.</span>
      <Button
        className="h-fit w-fit px-3 py-2 text-sm"
        bgColorTheme="orange"
        textColorTheme="white"
        onClick={() => {
          onClose();

          setTimeout(() => {
            replace(prefix + ROUTE_PATH.NOTICE.LIST);
          }, 0);
        }}
      >
        공지사항 목록 보기
      </Button>
    </div>
  );
}
