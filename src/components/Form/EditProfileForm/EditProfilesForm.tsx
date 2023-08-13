'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { UseStepFormContext } from '../StepForm';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import Avatar from '@/components/Avatar';
import EditField from '@/components/Profile/EditField';
import Button from '@/components/Button/Button';
import EditProfileMenu from '@/components/Profile/EditProfileMenu';
import ReadOnlyInput from '@/components/Input/StepFormInput/ReadOnlyInput';
import { updateUserInfo } from '@/service/user';
import { validateFullName } from '@/util/validate';
import { toastNotify } from '@/util/toastNotify';
import { type UpdateUserInfoResponse } from '@/interfaces/Dto/User';
import { type EditProfileFormData } from '@/interfaces/FormData';

export interface EditProfilesForm {
  fullName: string;
  email: string;
}

interface EditProfilesFormProps {
  hideHeader?: boolean;
}

function EditProfilesForm(props: EditProfilesFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setFocus,
    watch,
    formState: { errors },
    done,
  } = useFormContext() as UseStepFormContext<EditProfilesForm>;

  const [isFullNameEdit, setIsFullNameEdit] = useState(false);

  const { mutate: updateUserInfoMutate, status: updateUserInfoStatus } = useMutation(
    ({ email, fullName, password }: Required<EditProfileFormData>) =>
      updateUserInfo({
        email,
        fullName,
        password,
        passwordCheck: password,
        newPassword: password,
        newPasswordCheck: password,
      }),
    {
      retry: 0,
      onSuccess() {
        queryClient.removeQueries(['auth']);
        queryClient.invalidateQueries(['profile']);

        done();
      },
      onError(error) {
        if (isAxiosError<UpdateUserInfoResponse>(error)) {
          const { response } = error;

          if (response) {
            setError('root', { type: 'validate', message: response.data.data ?? response.data.msg });
          }
        }
      },
    },
  );

  watch((value, { type }) => {
    if (type === 'change' && errors.root) {
      clearErrors('root');
    }
  });

  const onValid = async ({ email, fullName }: EditProfilesForm) => {
    if (updateUserInfoStatus === 'loading') return;

    const { password } = getValues() as any;

    updateUserInfoMutate({ email, fullName, password });
  };

  const onInvalid = () => {
    toastNotify('error', '유효하지 않습니다');
  };

  return (
    <>
      <form id="editProfile" onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="flex items-center">
          <Avatar profileIndex={3} fullName={getValues().fullName} />
          <EditField
            isEditMode={isFullNameEdit}
            error={errors.fullName?.message}
            id="fullName"
            disabled={!isFullNameEdit}
            style={{
              marginLeft: '21px',
              width: '3rem',
            }}
            onLabelClick={() => {
              setFocus('fullName');
              setIsFullNameEdit(true);
            }}
            {...register('fullName', {
              required: '이름은 필수 입력 항목입니다',
              validate: (value) => {
                const { result } = validateFullName(value);

                if (result === true) return true;

                return '이름은 한글이나 영문으로만 입력되어야 합니다';
              },
            })}
          />
        </div>
        <ReadOnlyInput
          fieldName="email"
          style={{
            marginBottom: '61px',
            marginTop: '43px',
            color: '#5B6267',
            border: 'none',
            padding: '0',
            fontSize: '1rem',
          }}
        />
        <EditProfileMenu />
        <div id="submit_wrapper" className="fixed bottom-[64px] left-0 z-[4] flex w-full shrink-0 justify-center">
          <Button
            type="submit"
            form="editProfile"
            bgColorTheme="orange"
            textColorTheme="white"
            disabled={updateUserInfoStatus === 'loading'}
            className="relative !h-[54px] !rounded-md disabled:!bg-slate-300 disabled:!opacity-60"
          >
            {updateUserInfoStatus === 'loading' ? (
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                <div className="translate-y-[3.4px]">
                  <MuiSpinner />
                </div>
              </div>
            ) : null}
            변경완료
          </Button>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default EditProfilesForm;
