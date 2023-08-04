'use client';

import { useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '../StepForm';
import Avatar from '@/components/Avatar';
import EditField from '@/components/Profile/EditField';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toastNotify } from '@/util/toastNotify';
import { validateFullName } from '@/util/validate';
import { ToastContainer } from 'react-toastify';
import Button from '@/components/Button/Button';
import EditProfileMenu from '@/components/Profile/EditProfileMenu';
import ReadOnlyInput from '@/components/Input/StepFormInput/ReadOnlyInput';
import { updateUserInfo } from '@/service/user';
import { EditProfileFormData } from '@/interfaces/FormData';
import { isAxiosError } from 'axios';
import { UpdateUserInfoResponse } from '@/interfaces/Dto/User';

export interface EditProfilesForm {
  fullName: string;
  email: string;
}

interface EditProfilesFormProps {
  hideHeader?: boolean;
}

function EditProfilesForm(props: EditProfilesFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    setFocus,
    watch,
    formState: { errors },
    done,
  } = useFormContext() as UseStepFormContext<EditProfilesForm>;

  const [isFullNameEdit, setIsFullNameEdit] = useState(false);

  watch((value, { type }) => {
    if (type === 'change' && errors.root) {
      clearErrors('root');
    }
  });

  const onValid = async ({ email, fullName }: EditProfilesForm) => {
    const { password } = getValues() as EditProfileFormData;

    console.log('submit: ', { email, fullName, password });

    try {
      await updateUserInfo({
        email,
        fullName,
        password,
        passwordCheck: password,
        newPassword: password,
        newPasswordCheck: password,
      });

      done();
    } catch (err) {
      if (isAxiosError<UpdateUserInfoResponse>(err)) {
        const { response } = err;

        setError('root', { type: 'validate', message: response?.data.data ?? response?.data.msg });
      }
    }
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
        <div className="fixed bottom-[64px] left-0 flex w-full shrink-0 justify-center">
          <Button
            type="submit"
            form="editProfile"
            bgColorTheme="orange"
            className="!h-[54px] !rounded-md"
            textColorTheme="white"
          >
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
