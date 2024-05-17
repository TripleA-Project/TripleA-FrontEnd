'use client';

import { FieldErrors, useFormContext } from 'react-hook-form';
import FreeTierEndDateInput from '../../../register/_components/fields/end-date/FreeTierEndDateInput';
import FreeTierStartDateInput from '../../../register/_components/fields/start-date/FreeTierStartDateInput';
import { FreeTrialFormData } from '@/interfaces/FormData';
import MemoTextArea from '../../../register/_components/fields/memo/MemoTextarea';
import Button from '@/components/Button/Button';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { AdminUserTypeKey, useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';

export interface UpdateFreeTrialFormProps {
  onUpdateSubmit: (data: FreeTrialFormData) => void;
}

function UpdateFreeTrialForm({ onUpdateSubmit }: UpdateFreeTrialFormProps) {
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FreeTrialFormData>();

  const { selectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const onSubmit = (data: FreeTrialFormData) => {
    onUpdateSubmit({ ...data, idList: selectedUsers.map((user) => ({ id: user.id })) });
    reset();
  };

  const onInvalid = (errors: FieldErrors<FreeTrialFormData>) => {
    //
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <h3 className="mb-2 font-bold">무료체험 수정</h3>
      <FreeTierStartDateInput />
      <FreeTierEndDateInput />
      <div className="h-24">
        <MemoTextArea />
      </div>
      <div className="mt-6">
        <Button
          fullWidth
          bgColorTheme="orange"
          textColorTheme="white"
          className="h-8 rounded-md px-2 py-1 text-xs disabled:bg-orange-400/30 disabled:text-white/70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <MuiSpinner size={14} /> : '수정하기'}
        </Button>
      </div>
    </form>
  );
}

export default UpdateFreeTrialForm;
