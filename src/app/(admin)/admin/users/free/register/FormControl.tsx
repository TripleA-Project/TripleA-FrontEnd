'use client';

import Button from '@/components/Button/Button';
import { FreeTrialFormData } from '@/interfaces/FormData';
import { useModal } from '@/redux/slice/modalSlice';
import { FieldErrors, useFormContext } from 'react-hook-form';

function FormControl() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<FreeTrialFormData>();

  const { openModal } = useModal('admin:registerFreeTrial');

  const onSubmit = ({ idList, freeTierStartDate, freeTierEndDate, memo }: FreeTrialFormData) => {
    openModal('admin:registerFreeTrial', {
      idList: idList.map(({ id }) => id),
      freeTierStartDate,
      freeTierEndDate,
      memo,
    });
  };

  const onInvalid = (errors: FieldErrors<FreeTrialFormData>) => {
    // console.log({ errors });
  };

  const submitFreeTrialForm = (e: React.MouseEvent<HTMLButtonElement>) => control.handleSubmit(onSubmit, onInvalid)(e);

  return (
    <div className="flex h-full w-max items-center justify-between p-2">
      <Button
        className="h-fit w-fit px-2 py-1 text-xs text-white disabled:bg-gray-300 disabled:text-gray-700"
        bgColorTheme="orange"
        textColorTheme="white"
        disabled={isSubmitting}
        onClick={submitFreeTrialForm}
      >
        무료체험 등록
      </Button>
    </div>
  );
}

export default FormControl;
