'use client';

import { AdminFreeTrialType, useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import RegisterModalWrapper from './RegisterModalWrapper';
import ProgressView, {
  ProgressDoneViewProps,
  ProgressIdleViewProps,
  ProgressViewProps,
  ProgressWorkingViewProps,
} from '@/components/ProgressView';
import { registerFreeTrial } from '@/service/admin';
import { useEffect } from 'react';
import Button from '@/components/Button/Button';
import { revalidateAction } from '@/util/actions/revalidate';
import { useFormContext } from 'react-hook-form';

function RegisterModal() {
  const { modal } = useModal<AdminFreeTrialType>('admin:registerFreeTrial');

  if (modal.open && modal.modalType === 'admin:registerFreeTrial' && typeof window !== 'undefined') {
    return createPortal(
      <RegisterModalWrapper>
        <RegisterModalContent />
      </RegisterModalWrapper>,
      document.body,
    );
  }

  return null;
}

export default RegisterModal;

const RegisterModalContent = () => {
  const { reset } = useFormContext();
  const { modal, closeModal } = useModal('admin:registerFreeTrial');

  const onDone: NonNullable<ProgressViewProps['onDone']> = ({ completedTaskResult }) => {
    reset();
    setTimeout(async () => {
      await revalidateAction('/admin/users/free', 'layout');
    }, 0);
  };

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4">
      <ProgressView
        taskList={modal.data!.idList.map((targetUserId) => {
          const { freeTierStartDate, freeTierEndDate, memo } = modal.data!;
          return () => registerFreeTrial({ id: targetUserId, freeTierStartDate, freeTierEndDate, memo });
        })}
        onDone={onDone}
        onClose={closeModal}
      >
        <ProgressView.Idle>{RegisterProgressIdle}</ProgressView.Idle>
        <ProgressView.Working>{RegisterProgressWorking}</ProgressView.Working>
        <ProgressView.Done>{RegisterProgressDone}</ProgressView.Done>
      </ProgressView>
    </div>
  );
};

/* progress view */

function RegisterProgressIdle({ runTasks, onClose }: ProgressIdleViewProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold">선택한 유저를 무료체험 유저로 등록 하시겠습니까?</span>
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

function RegisterProgressWorking({ endTaskResult, totalTaskResult }: ProgressWorkingViewProps) {
  return (
    <div>
      <span className="font-bold text-gray-300">{endTaskResult.length}</span> /{' '}
      <span className="font-bold">{totalTaskResult.length}</span>
    </div>
  );
}

function RegisterProgressDone({ completedTaskResult, failTaskResult, onDone, onClose }: ProgressDoneViewProps) {
  useEffect(() => {
    onDone && onDone({ completedTaskResult, failTaskResult });
  }, []); /* eslint-disable-line */

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-emerald-500">무료체험 등록 작업을 완료하였습니다.</span>
      <Button className="h-fit w-fit px-3 py-2" bgColorTheme="orange" textColorTheme="white" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
}
