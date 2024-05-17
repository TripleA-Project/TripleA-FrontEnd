'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import FreeTrialModalWrapper from './FreeTrialModalWrapper';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressViewProps,
  ProgressWorkingViewProps,
} from '@/components/ProgressView';
import UpdateFreeTrialForm from '../form/update/UpdateFreeTrialForm';
import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import { updateFreeTrial } from '@/service/admin';
import { FreeTrialFormData } from '@/interfaces/FormData';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateFreeTrialUserRequest,
  UpdateFreeTrialUserResponse,
} from '@/interfaces/Dto/Admin/free-trial/UpdateFreeTrialUserDto';
import { AdminUserTypeKey, useAdminSelectedUserList, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import { Task } from '@/hooks/progress/useParallelProgress';
import { useFormContext } from 'react-hook-form';

function UpdateFreeTrialModal() {
  const { modal } = useModal('admin:updateFreeTrial');

  if (modal.open && modal.modalType === 'admin:updateFreeTrial' && typeof window !== 'undefined') {
    return createPortal(
      <FreeTrialModalWrapper>
        <UpdateFreeTrialModalContent />
      </FreeTrialModalWrapper>,
      document.body,
    );
  }

  return null;
}

export default UpdateFreeTrialModal;

const UpdateFreeTrialModalContent = () => {
  const { closeModal } = useModal('admin:updateFreeTrial');

  const { dispatch, updateUsers } = useAdminUserList<AdminUserTypeKey.FreeTierUsers>();
  const { clearSelectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const { reset } = useFormContext<FreeTrialFormData>();
  const formDataRef = useRef<FreeTrialFormData | null>(null);

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [progressReady, setProgressReady] = useState(false);

  const onDone: NonNullable<ProgressViewProps['onDone']> = ({ completedTaskResult }) => {
    const targetUserIdsPayload = (completedTaskResult as AxiosResponse<UpdateFreeTrialUserResponse>[]).map((result) => {
      const config = result.config as AxiosRequestConfig;

      const data = JSON.parse(config.data) as UpdateFreeTrialUserRequest;

      return data.id;
    });

    const updatePayload = targetUserIdsPayload.map((id) => ({
      id,
      freeTierStartDate: formDataRef.current!.freeTierStartDate + 'T00:00:00.000+00:00',
      freeTierEndDate: formDataRef.current!.freeTierEndDate + 'T00:00:00.000+00:00',
      ...(formDataRef.current!.memo && { memo: formDataRef.current!.memo }),
    }));

    dispatch(updateUsers(updatePayload));
    dispatch(clearSelectedUsers());
  };

  const onUpdateSumbit = (data: FreeTrialFormData) => {
    formDataRef.current = data;

    setTaskList(
      data.idList.map(
        ({ id: userId }) =>
          () =>
            updateFreeTrial({
              id: userId,
              freeTierStartDate: data.freeTierStartDate,
              freeTierEndDate: data.freeTierEndDate,
              memo: data.memo,
            }),
      ),
    );

    setProgressReady(true);
  };

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className="flex h-max flex-col items-center justify-center gap-4 rounded-xl bg-white px-2 py-8 shadow-lg">
      {progressReady ? (
        <ProgressView taskList={taskList} onDone={onDone} onClose={closeModal}>
          <ProgressView.Idle>{UpdateFreeTrialProgressIdle}</ProgressView.Idle>
          <ProgressView.Working>{UpdateFreeTrialProgressWorking}</ProgressView.Working>
          <ProgressView.Done>{UpdateFreeTrialProgressDone}</ProgressView.Done>
        </ProgressView>
      ) : (
        <>
          <div className="absolute left-0 top-3 flex w-full items-center justify-end self-start">
            <Button
              bgColorTheme="none"
              textColorTheme="none"
              className="mr-4 mt-2 h-fit w-fit p-0.5"
              onClick={() => {
                closeModal();
                reset();
              }}
            >
              <AppIcons.CloseFill.Orange width={20} height={20} />
            </Button>
          </div>
          <UpdateFreeTrialForm onUpdateSubmit={onUpdateSumbit} />
        </>
      )}
    </div>
  );
};

/* progress view */

function UpdateFreeTrialProgressIdle({ runTasks }: ProgressIdleViewProps) {
  useEffect(() => {
    runTasks();
  }, []); /* eslint-disable-line */

  return <></>;
}

function UpdateFreeTrialProgressWorking({ endTaskResult, totalTaskResult }: ProgressWorkingViewProps) {
  return (
    <div>
      <span className="font-bold text-gray-300">{endTaskResult.length}</span> /{' '}
      <span className="font-bold">{totalTaskResult.length}</span>
    </div>
  );
}

function UpdateFreeTrialProgressDone({ completedTaskResult, failTaskResult, onDone, onClose }: ProgressDoneViewProps) {
  useEffect(() => {
    onDone && onDone({ completedTaskResult, failTaskResult });
  }, []); /* eslint-disable-line */

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">무료체험 수정 작업을 완료하였습니다.</span>
      <Button className="h-fit w-fit px-3 py-2" bgColorTheme="orange" textColorTheme="white" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
}
