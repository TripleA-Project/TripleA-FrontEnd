'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import UserManageModalWrapper from './UserManageModalWrapper';
import Button from '@/components/Button/Button';
import { deleteUser } from '@/service/admin';
import { useQueryClient } from '@tanstack/react-query';
import { clearSelectedUsers } from '@/redux/slice/adminUserListSlice';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressWorkingViewProps,
} from '../progress/ProgressView';
import { useEffect } from 'react';

function DeleteUserModal() {
  const { modal } = useModal('admin:deleteUser');

  if (modal.open && modal.modalType === 'admin:deleteUser' && typeof window !== 'undefined') {
    return createPortal(
      <UserManageModalWrapper>
        <DeleteUserModalContent />
      </UserManageModalWrapper>,
      document.body,
    );
  }

  return null;
}

export default DeleteUserModal;

const DeleteUserModalContent = () => {
  const queryClient = useQueryClient();

  const { modal, closeModal, dispatch } = useModal('admin:deleteUser');

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
          return () => deleteUser({ id: user.id });
        })}
        onDone={onDone}
        onClose={closeModal}
      >
        <ProgressView.Idle>{DeleteUserProgressIdle}</ProgressView.Idle>
        <ProgressView.Working>{DeleteUserProgressWorking}</ProgressView.Working>
        <ProgressView.Done>{DeleteUserProgressDone}</ProgressView.Done>
      </ProgressView>
    </div>
  );
};

/* progress view */

function DeleteUserProgressIdle({ runTasks, onClose }: ProgressIdleViewProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">선택한 유저를 탈퇴처리 하시겠습니까?</span>
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

function DeleteUserProgressWorking({ endTaskResult, totalTaskResult }: ProgressWorkingViewProps) {
  return (
    <div>
      <span className="font-bold text-gray-300">{endTaskResult.length}</span> /{' '}
      <span className="font-bold">{totalTaskResult.length}</span>
    </div>
  );
}

function DeleteUserProgressDone({ onDone, onClose }: ProgressDoneViewProps) {
  useEffect(() => {
    onDone();
  }, []); /* eslint-disable-line */

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">회원 탈퇴 작업을 완료하였습니다.</span>
      <Button className="h-fit w-fit px-3 py-2" bgColorTheme="orange" textColorTheme="white" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
}
