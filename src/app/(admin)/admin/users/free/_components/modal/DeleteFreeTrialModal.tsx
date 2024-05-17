'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import FreeTrialModalWrapper from './FreeTrialModalWrapper';
import { useEffect, useLayoutEffect } from 'react';
import { AdminUserTypeKey, useAdminSelectedUserList, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressViewProps,
  ProgressWorkingViewProps,
} from '@/components/ProgressView';
import { deleteFreeTrialUser } from '@/service/admin';
import Button from '@/components/Button/Button';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DeleteFreeTrialUserResponse } from '@/interfaces/Dto/Admin/free-trial/DeleteFreeTrialUserDto';

function DeleteFreeTrialModal() {
  const { modal } = useModal('admin:deleteFreeTrial');

  if (modal.open && modal.modalType === 'admin:deleteFreeTrial' && typeof window !== 'undefined') {
    return createPortal(
      <FreeTrialModalWrapper>
        <DeleteFreeTrialModalContent />
      </FreeTrialModalWrapper>,
      document.body,
    );
  }

  return null;
}

export default DeleteFreeTrialModal;

const DeleteFreeTrialModalContent = () => {
  const { modal, closeModal, dispatch } = useModal('admin:deleteFreeTrial');

  const { deleteUsers } = useAdminUserList<AdminUserTypeKey.FreeTierUsers>();
  const { clearSelectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const onDone: NonNullable<ProgressViewProps['onDone']> = ({ completedTaskResult }) => {
    const targetUserIdsPayload = (completedTaskResult as AxiosResponse<DeleteFreeTrialUserResponse>[]).map((result) => {
      const config = result.config as AxiosRequestConfig;

      return Number(config.url!.replace('/api/admin/experience/delete/', ''));
    });

    dispatch(deleteUsers(targetUserIdsPayload));
    dispatch(clearSelectedUsers());
  };

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4 rounded-xl bg-white shadow-lg">
      <ProgressView
        taskList={modal.data!.idList.map((id) => {
          return () => deleteFreeTrialUser({ id });
        })}
        onDone={onDone}
        onClose={closeModal}
      >
        <ProgressView.Idle>{DeleteFreeTrialProgressIdle}</ProgressView.Idle>
        <ProgressView.Working>{DeleteFreeTiralProgressWorking}</ProgressView.Working>
        <ProgressView.Done>{DeleteFreeTrialProgressDone}</ProgressView.Done>
      </ProgressView>
    </div>
  );
};

/* progress view */

function DeleteFreeTrialProgressIdle({ runTasks, onClose }: ProgressIdleViewProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">선택한 유저의 무료체험을 종료 하시겠습니까?</span>
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

function DeleteFreeTiralProgressWorking({ endTaskResult, totalTaskResult }: ProgressWorkingViewProps) {
  return (
    <div>
      <span className="font-bold text-gray-300">{endTaskResult.length}</span> /{' '}
      <span className="font-bold">{totalTaskResult.length}</span>
    </div>
  );
}

function DeleteFreeTrialProgressDone({ completedTaskResult, failTaskResult, onDone, onClose }: ProgressDoneViewProps) {
  useEffect(() => {
    onDone && onDone({ completedTaskResult, failTaskResult });
  }, []); /* eslint-disable-line */

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">무료체험 종료(삭제) 작업을 완료하였습니다.</span>
      <Button className="h-fit w-fit px-3 py-2" bgColorTheme="orange" textColorTheme="white" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
}
