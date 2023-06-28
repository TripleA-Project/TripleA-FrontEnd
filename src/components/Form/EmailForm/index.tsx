'use client';

import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

import { UseStepFormContext } from '../StepForm';
import Button from '@/components/Button/Button';

import { FormData } from '@/interfaces/FormData';
import { signup, verifyEmail, verifyEmailSend } from '@/service/auth';
import { validateEmail } from '@/util/validate';

export interface EmailFormData {
  email: string;
  code: string;
}

export function EmailForm() {
  const { register, handleSubmit, done, prev, getValues } = useFormContext() as UseStepFormContext<EmailFormData>;

  const values = getValues() as FormData;
  console.log('초기emailform: ', { values });

  const onValid: SubmitHandler<EmailFormData> = async (data) => {
    // if(!values.email) return
    try {
      const { email, code } = data;
      const response = await verifyEmail({ email: data.email as string, code: data.code });
      console.log(response);
      done();
    } catch (error) {
      console.log(error);
    }
  };

  const onInvalid: SubmitErrorHandler<EmailFormData> = (errors) => {
    console.log({ errors });
  };

  return (
    <div>
      <form className="h-[600px]" onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="flex pl-[18px] text-lg font-semibold">
          인증코드를
          <br />
          입력해주세요.
        </div>
        <input
          defaultValue={values.email}
          placeholder="입력된 이메일"
          disabled
          id="email"
          className="mx-auto mt-6 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
          {...register('email', {
            required: true,
            validate: (value) => {
              const { result } = validateEmail(value);

              if (result === true) return true;

              return '이메일 형식이 아닙니다';
            },
          })}
        />
        <div>
          <input
            placeholder="인증코드"
            id="code"
            {...register('code')}
            className="mx-auto mt-6 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
          />
          <Button
            type="submit"
            className="mx-auto mt-14 box-border font-bold "
            sizeTheme="medium"
            bgColorTheme="lightgray"
            textColorTheme="white"
          >
            이메일 인증하기
          </Button>
          <button
            className="flex h-[20px] w-[80px] border-b border-black"
            type="button"
            onClick={() => {
              // await verifyEmailSend({email})
            }}
          >
            코드재발송
          </button>
          <Button
            type="button"
            className="mx-auto mt-2 box-border font-bold "
            sizeTheme="medium"
            bgColorTheme="lightgray"
            textColorTheme="white"
            onClick={() => prev()}
          >
            back
          </Button>
        </div>
      </form>
    </div>
  );
}
