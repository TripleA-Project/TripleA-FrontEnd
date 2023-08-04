'use client';

import { useFormContext } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { isAxiosError } from 'axios';
import Button from '@/components/Button/Button';
import PasswordInput from '@/components/Input/StepFormInput/PasswordInput';
import { updateUserInfo } from '@/service/user';
import { toastNotify } from '@/util/toastNotify';
import { validatePassword } from '@/util/validate';
import { type UseStepFormContext } from '../StepForm';
import { type APIResponse } from '@/interfaces/Dto/Core';

interface EditPasswordForm {
  newPassword: string;
  newPasswordCheck: string;
}

interface EditProfilesFormProps {
  hideHeader?: boolean;
}

function EditPasswordForm(props: EditProfilesFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    done,
  } = useFormContext() as UseStepFormContext<EditPasswordForm>;

  watch((value, { type }) => {
    if (type === 'change' && errors.root) {
      clearErrors('root');
    }
  });

  const onValid = async ({ newPassword, newPasswordCheck }: EditPasswordForm) => {
    const { email, fullName, password } = getValues() as any;

    if (newPassword === password) {
      setError('root', {
        type: 'validate',
        message: '현재 비밀번호와 다른 비밀번호를 입력해주세요',
      });

      toastNotify('error', '유효하지 않습니다');

      return;
    }

    try {
      await updateUserInfo({
        email,
        fullName,
        password,
        passwordCheck: password,
        newPassword,
        newPasswordCheck,
      });

      done();
    } catch (err) {
      if (isAxiosError<APIResponse<{ key: string; value: string }>>(err)) {
        const { response } = err;

        setError('root', {
          type: 'validate',
          message: response?.data.data ? response.data.data.value : response?.data.msg,
        });
      }
    }
  };

  const onInvalid = () => {
    toastNotify('error', '유효하지 않습니다');
  };

  return (
    <>
      <form
        id="editPassword"
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex h-[calc(100vh-242px)] flex-col items-center justify-center gap-8"
      >
        <div className="w-full">
          <label htmlFor="newPassword">새로운 비밀번호</label>
          <PasswordInput
            id="newPassword"
            {...register('newPassword', {
              required: '비밀번호를 입력해주세요',
              validate(value) {
                const { result, type } = validatePassword(value);

                if (result === true) return true;

                if (type === 'passwordLength') return '패스워드는 8자 이상, 16자 이하입니다';
                if (type === 'notAllowedChar') return '패스워드는 영문 대소문자, 0-9 숫자로 구성되어야 합니다';
                if (type === 'NotContainSpecial') return '최소 1개 이상의 특수문자가 포함되어야 합니다';

                return '유효하지 않은 비밀번호입니다';
              },
            })}
          />
          {errors.newPassword ? <span className="text-xs text-error">{errors.newPassword.message}</span> : null}
        </div>
        <div className="w-full">
          <label htmlFor="newPasswordCheck">새로운 비밀번호 확인</label>
          <PasswordInput
            id="newPasswordCheck"
            {...register('newPasswordCheck', {
              required: '새로운 비밀번호 확인을 입력해주세요',
              validate(value) {
                return getValues().newPassword === value ? true : '입력한 비밀번호와 같지 않습니다';
              },
            })}
          />
          {errors.newPasswordCheck ? (
            <span className="text-xs text-error">{errors.newPasswordCheck.message}</span>
          ) : null}
        </div>
        {errors.root ? <span className="text-xs text-error">{errors.root.message}</span> : null}
        <div className="fixed bottom-[64px] left-0 flex w-full shrink-0 justify-center">
          <Button
            type="submit"
            form="editPassword"
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

export default EditPasswordForm;
