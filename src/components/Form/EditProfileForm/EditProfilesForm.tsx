'use client';

import { useState } from 'react';
import { AxiosError, HttpStatusCode } from 'axios';
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
import type { EditProfileFormData } from '@/interfaces/FormData';
import type { APIResponse } from '@/interfaces/Dto/Core';
import { AppIcons } from '@/components/Icons';
import { useRouter } from 'next/navigation';

export interface EditProfilesForm {
  fullName: string;
  email: string;
}

interface EditProfilesFormProps {
  hideHeader?: boolean;
}

function EditProfilesForm(props: EditProfilesFormProps) {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();

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

  const [isEditField, setIsEditField] = useState<{ editingField: 'fullName' | null }>({
    editingField: null,
  });

  const editingFieldNames = {
    fullName: '이름',
  };

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

        refresh();

        done();
      },
      onError(error) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>;

          if (response && response.data.status === HttpStatusCode.BadRequest) {
            const serverFieldErrorResponse = error as AxiosError<APIResponse<{ key: string; value: string }>>;

            const { key, value } = serverFieldErrorResponse.response!.data.data!;

            setError(key as any, { type: 'validate', message: value });

            return;
          }
        }

        setError('root', { type: 'validate', message: (error as Error)?.message ?? '유효하지 않습니다' });
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

    try {
      updateUserInfoMutate({ email, fullName, password });
    } catch (err) {
      toastNotify('error', '유효하지 않습니다');
    }
  };

  const onInvalid = () => {
    toastNotify('error', '유효하지 않습니다');
  };

  return (
    <>
      <form id="editProfile" onSubmit={handleSubmit(onValid, onInvalid)} className="relative">
        {isEditField.editingField ? (
          <div
            className="absolute -top-14 left-0 flex w-full justify-center"
            onClick={() =>
              setIsEditField((prev) => ({
                ...prev,
                editingField: null,
              }))
            }
          >
            <div className="flex cursor-pointer select-none items-center justify-center gap-3 rounded-full border bg-white p-2 shadow-lg">
              <span className="font-bold text-[#FC954A]">{`${
                editingFieldNames[isEditField.editingField]
              } 수정 취소`}</span>
              <AppIcons.CloseFill.Orange />
            </div>
          </div>
        ) : null}
        <div className="flex items-center">
          <Avatar profileIndex={3} fullName={getValues().fullName} />
          <EditField
            isEditMode={isEditField.editingField === 'fullName'}
            error={errors.fullName?.message}
            id="fullName"
            disabled={isEditField.editingField !== 'fullName'}
            style={{
              marginLeft: '21px',
              width: '3rem',
            }}
            onLabelClick={() => {
              setFocus('fullName');
              setIsEditField((prev) => ({ ...prev, editingField: 'fullName' }));
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
        <EditProfileMenu isEditing={!!isEditField.editingField} />
        <div
          id="submit_wrapper"
          className={`fixed bottom-[64px] left-0 z-[11] flex w-full min-w-[390px] shrink-0 justify-center ${
            isEditField.editingField ? 'visible' : 'invisible'
          }`}
        >
          <Button
            type="submit"
            form="editProfile"
            bgColorTheme="orange"
            textColorTheme="white"
            disabled={!isEditField.editingField || updateUserInfoStatus === 'loading'}
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
