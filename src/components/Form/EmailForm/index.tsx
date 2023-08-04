'use client';

import Button from '@/components/Button/Button';
import { useFormContext } from 'react-hook-form';
import { validateEmail } from '@/util/validate';
import { UseStepFormContext } from '../StepForm';
import { verifyEmailSend } from '@/service/auth';
import FormTitle from '../FormTitle';
import ResetValueInput from '@/components/Input/StepFormInput/ResetValueInput';
import { AxiosError } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';

export interface EmailForm {
  email: string;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    done,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext<EmailForm>() as UseStepFormContext<EmailForm>;

  const title = `
    로그인에 사용할
    이메일을 입력해주세요 
  `;

  const onSubmit = async ({ email }: EmailForm) => {
    try {
      await verifyEmailSend({ email });

      done();
    } catch (error) {
      const { response } = error as AxiosError<APIResponse<{ key: string; value: string }>>;

      const { data: errorPayload, msg } = response!.data;

      setError('email', { type: 'validate', message: errorPayload ? errorPayload.value : msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title={title} />
      <div className="mb-11">
        <ResetValueInput
          type="email"
          placeholder="이메일 입력"
          {...register('email', {
            required: '이메일을 입력해주세요',
            validate: (value) => {
              const { result } = validateEmail(value);

              if (result === true) return true;

              return '이메일 형식이 아닙니다';
            },
          })}
        />
        {errors.email ? <span className="mt-2 block text-sm text-error">{errors.email.message}</span> : null}
      </div>
      <Button
        type="submit"
        disabled={!isValid || (isValid && isSubmitting)}
        className={`font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]`}
        sizeTheme="fullWidth"
        bgColorTheme={'orange'}
        textColorTheme="white"
      >
        {isSubmitting ? '인증코드 전송 요청 중' : '인증코드 전송하기'}
      </Button>
    </form>
  );
}
export default SignupForm;
