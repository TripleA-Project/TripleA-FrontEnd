'use client';

import Button from '@/components/Button/Button';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '../StepForm';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export interface PasswordFormData {
  email: string;
  password: string;
  passwordCheck: string;
}

function PasswordForm() {
  const {
    register,
    handleSubmit,
    done,
    prev,
    getValues,
    formState: { isValid },
  } = useFormContext() as UseStepFormContext<PasswordFormData>;

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const values = getValues();
  const onValid: SubmitHandler<PasswordFormData> = (data) => {
    done();
  };

  const onInvalid: SubmitErrorHandler<PasswordFormData> = (errors) => {
    console.log({ errors });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="pt-[54px]">
        <div className="flex pt-[25px] text-lg font-semibold">
          로그인에 사용할
          <br />
          비밀번호를 입력해주세요.
        </div>
        <input
          value={values.email}
          disabled
          id="email"
          className="mx-auto mt-6 flex h-[46px] w-full rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
        />
        <div className="relative mx-auto mt-6 flex h-[46px] w-full rounded-lg border-[1px] border-solid placeholder-[#DBDEE1]">
          <input
            placeholder="비밀번호 입력"
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password', {
              required: '패스워드를 입력해주세요',
              validate: (value) => {
                const passwordLength = /^.{8,16}$/;
                const notAllowdChar = /[^a-zA-Z0-9\!\@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>]/g;
                const isContainAllowdSpec = /[\!@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>]/g;

                if (!passwordLength.test(value)) return '패스워드는 8자 이상, 16자 이하입니다';
                if (notAllowdChar.test(value)) return '패스워드는 영문 대소문자, 0-9 숫자로 구성되어야 합니다';
                if (!isContainAllowdSpec.test(value)) return '특수문자가 포함되어있지 않습니다';

                return true;
              },
            })}
            className="w-full flex-1 bg-transparent pl-4 focus:border-none focus:outline-none"
          />
          <div className="box-border flex items-center p-4">
            <button type="button" onClick={handleTogglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
        <div className="relative mx-auto mt-6 flex h-[46px] w-full rounded-lg border-[1px] border-solid placeholder-[#DBDEE1]">
          <input
            placeholder="비밀번호 확인"
            id="passwordCheck"
            type={showPassword ? 'text' : 'password'}
            {...register('passwordCheck', {
              required: '패스워드를 확인해주세요',
              validate: {
                isEqualPassword: (value) => {
                  return value === getValues('password') ? true : '패스워드와 일치하지 않습니다';
                },
              },
            })}
            className="w-full flex-1 bg-transparent pl-4 focus:border-none focus:outline-none"
          />
          <div className="box-border flex items-center p-4">
            <button type="button" onClick={handleTogglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          sizeTheme="fullWidth"
          className="mx-auto mt-14 box-border font-bold"
          bgColorTheme={
            (getValues('password') === undefined && getValues('passwordCheck') === undefined) ||
            getValues('password') !== getValues('passwordCheck')
              ? 'lightgray'
              : 'orange'
          }
          textColorTheme="white"
          disabled={!isValid}
        >
          다음
        </Button>
        <Button
          type="button"
          className="mx-auto mt-2 box-border font-bold "
          sizeTheme="fullWidth"
          bgColorTheme="lightgray"
          textColorTheme="white"
          onClick={() => prev()}
        >
          back
        </Button>
      </form>
    </div>
  );
}
export default PasswordForm;
