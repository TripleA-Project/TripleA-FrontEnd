'use client';

import Button from '@/components/Button/Button';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { validateEmail } from '@/util/validate';
import { UseStepFormContext } from '../StepForm';
import { verifyEmailSend } from '@/service/auth';

export interface SignupForm {
  email: string;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    done,
    formState: { errors, isValid },
  } = useFormContext<SignupForm>() as UseStepFormContext<SignupForm>;

  const onSubmit = async (data: SignupForm) => {
    console.log('signupForm: ', { data });
    try {
      const response = await verifyEmailSend({ email: data.email });
      console.log(response);
      done();
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const onInvalid = (errors: FieldErrors<SignupForm>) => {
    console.log('error:', errors);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="pt-[54px]">
        <div className="flex pt-[25px] text-lg font-semibold">
          로그인에 사용할 <br />
          이메일을 입력해주세요
        </div>
        <input
          placeholder="이메일 입력"
          id="email"
          {...register('email', {
            required: '이메일을 입력해주세요',
            validate: (value) => {
              const { result } = validateEmail(value);

              if (result === true) return true;

              return '이메일 형식이 아닙니다';
            },
          })}
          className="mx-auto mt-6 flex h-[45px] w-full rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
        />
        <Button
          type="submit"
          disabled={!isValid}
          className="mx-auto mt-14 box-border font-bold "
          sizeTheme="fullWidth"
          bgColorTheme={isValid ? 'orange' : 'lightgray'}
          textColorTheme="white"
          // onClick={handleClickButton}
        >
          인증코드 전송하기
        </Button>
      </form>
    </div>
  );
}
export default SignupForm;
