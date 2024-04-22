'use client';

import { type AxiosError } from 'axios';
import { useFormContext } from 'react-hook-form';
import FormTitle from '../FormTitle';
import ReadOnlyInput from '@/components/Input/StepFormInput/ReadOnlyInput';
import Button from '@/components/Button/Button';
import { type UseStepFormContext } from '../StepForm';
import { verifyEmail, verifyEmailSend } from '@/service/auth';
import { type APIResponse } from '@/interfaces/Dto/Core';
import TimerInput from '@/components/Input/StepFormInput/TimerInput';
import { timerReset, timerStart } from '@/components/Timer';

export interface EmailVerifyForm {
  code: string;
  emailKey: string;
}

function EmailVerifyForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { isValid, errors },
    done,
  } = useFormContext() as UseStepFormContext<EmailVerifyForm>;

  const title = `
    인증코드를
    입력해주세요.
  `;

  const onValid = async ({ code }: EmailVerifyForm) => {
    try {
      // @ts-ignore
      const { email } = getValues();

      const response = await verifyEmail({ email, code });

      setValue('emailKey', response.data.data!);

      done();
    } catch (error) {
      const { response } = error as AxiosError<APIResponse<{ key: string; value: string }>>;

      const { data: errorPayload, msg } = response!.data;

      setError('code', { type: 'validate', message: errorPayload ? errorPayload.value : msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <FormTitle title={title} />
      <div className="mb-11 space-y-6">
        <ReadOnlyInput fieldName="email" />
        <TimerInput minute={3} placeholder="인증코드" {...register('code', { required: '인증코드를 입력해주세요' })} />
        <input hidden {...register('emailKey')} />
      </div>
      {errors.code ? <span className="-mt-8 mb-2 block text-sm text-error">{errors.code.message}</span> : null}
      <Button
        type="submit"
        className="font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
        sizeTheme="fullWidth"
        bgColorTheme="orange"
        textColorTheme="white"
        disabled={!isValid}
      >
        이메일 인증하기
      </Button>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          className="underline-[#5B6267] text-sm font-medium text-[#5B6267] underline underline-offset-2"
          onClick={async () => {
            // @ts-ignore
            await verifyEmailSend({ email: getValues().email });

            timerReset();
            timerStart();
          }}
        >
          코드재발송
        </button>
      </div>
    </form>
  );
}

export default EmailVerifyForm;
