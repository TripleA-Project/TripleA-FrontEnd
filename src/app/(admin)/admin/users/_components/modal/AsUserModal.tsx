'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import UserManageModalWrapper from './UserManageModalWrapper';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressWorkingViewProps,
} from '../progress/ProgressView';
import { useQueryClient } from '@tanstack/react-query';
import { clearSelectedUsers } from '@/redux/slice/adminUserListSlice';
import { changeUserRole } from '@/service/admin';
import Button from '@/components/Button/Button';
import { useEffect } from 'react';

function AsUserModal() {
  const { modal } = useModal('admin:asUser');

  if (modal.open && modal.modalType === 'admin:asUser' && typeof window !== 'undefined') {
    return createPortal(
      <UserManageModalWrapper>
        <AsUserModalContent />
      </UserManageModalWrapper>,
      document.body,
    );
  }

  return null;
}

export default AsUserModal;

const AsUserModalContent = () => {
  const queryClient = useQueryClient();

  const { modal, closeModal, dispatch } = useModal('admin:asUser');

  const onDone = () => {
    queryClient.invalidateQueries({
      queryKey: ['siteUser'],
    });

    dispatch(clearSelectedUsers());
  };

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4">
      <ProgressView
        taskList={modal.data!.selectedUsers.map((user) => {
          return () => changeUserRole({ email: user.email, role: 'USER' });
        })}
        onDone={onDone}
        onClose={closeModal}
      >
        <ProgressView.Idle>{AsUserProgressIdle}</ProgressView.Idle>
        <ProgressView.Working>{AsUserProgressWorking}</ProgressView.Working>
        <ProgressView.Done>{AsUserProgressDone}</ProgressView.Done>
      </ProgressView>
    </div>
  );
};

/* progress view */

function AsUserProgressIdle({ runTasks, onClose }: ProgressIdleViewProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">선택한 관리자를 일반 유저로 변경 하시겠습니까?</span>
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

function AsUserProgressWorking({ endTaskResult, totalTaskResult }: ProgressWorkingViewProps) {
  return (
    <div>
      <span className="font-bold text-gray-300">{endTaskResult.length}</span> /{' '}
      <span className="font-bold">{totalTaskResult.length}</span>
    </div>
  );
}

function AsUserProgressDone({ onDone, onClose }: ProgressDoneViewProps) {
  useEffect(() => {
    onDone();
  }, []); /* eslint-disable-line */

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">관리자를 유저로 변경하는 작업을 완료하였습니다.</span>
      <Button className="h-fit w-fit px-3 py-2" bgColorTheme="orange" textColorTheme="white" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
}
