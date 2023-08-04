'use client';

import { type AxiosError } from 'axios';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/Button/Button';
import PasswordInput from '@/components/Input/StepFormInput/PasswordInput';
import { login } from '@/service/auth';
import { type UseStepFormContext } from '../StepForm';
import { type APIResponse } from '@/interfaces/Dto/Core';
import { validatePassword } from '@/util/validate';

export interface ValidatePasswordForm {
  password: string;
}

interface ValidatePasswordFormProps {
  hideHeader?: boolean;
}

function ValidatePasswordForm(props: ValidatePasswordFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { isValid, errors },
    done,
  } = useFormContext() as UseStepFormContext<ValidatePasswordForm>;

  const onValid = async ({ password }: ValidatePasswordForm) => {
    try {
      const { email } = getValues() as any;
      await login({ email, password });

      done();
    } catch (error) {
      const { response } = error as AxiosError<APIResponse<{ key: string; value: string }>>;

      const { data: errorPayload, msg } = response!.data;

      setError('password', { type: 'validate', message: errorPayload ? errorPayload.value : msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <section className="mb-4">
        <h2 className="mb-2 font-bold">비밀번호 확인</h2>
        <h3 className="text-sm">
          회원정보를 안전하게 보호하기 위해 <br />
          비밀번호를 한번 더 확인해 주세요.
        </h3>
      </section>
      <div className="mb-11 space-y-6">
        <PasswordInput
          {...register('password', {
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
      </div>
      {errors.password ? <span className="-mt-8 mb-2 block text-sm text-error">{errors.password.message}</span> : null}
      <Button
        type="submit"
        className="font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
        sizeTheme="fullWidth"
        bgColorTheme="orange"
        textColorTheme="white"
        disabled={!isValid}
      >
        확인
      </Button>
    </form>
  );
}

export default ValidatePasswordForm;
