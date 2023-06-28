'use client';

import Button from '@/components/Button/Button';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '../StepForm';
import { useEffect, useState } from 'react';
import { validatePassword } from '@/util/validate';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export interface PasswordFormData {
  email: string;
  password: string;
  passwordCheck: string;
}

function PasswordForm() {
  const { register, handleSubmit, done, prev, getValues } = useFormContext() as UseStepFormContext<PasswordFormData>;

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const values = getValues();
  // useEffect(() => {}, [getValues('passwordRemind')]);
  const onValid: SubmitHandler<PasswordFormData> = (data) => {
    done();
  };

  const onInvalid: SubmitErrorHandler<PasswordFormData> = (errors) => {
    console.log({ errors });
  };
  const [emailValue, setEmailValue] = useState('');

  // useEffect(() => {
  //   const value = localStorage.getItem('email');
  //   if (value) {
  //     setEmailValue(value);
  //   }
  // }, []);
  console.log('password:', getValues('password'));
  console.log('passwordCheck:', getValues('passwordCheck'));
  return (
    <div>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="flex pl-[18px] text-lg font-semibold">
          로그인에 사용할
          <br />
          비밀번호를 입력해주세요.
        </div>
        <input
          value={values.email}
          disabled
          id="email"
          className="mx-auto mt-6 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
        />
        <div className="relative mx-auto mt-6 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid placeholder-[#DBDEE1]">
          <input
            placeholder="비밀번호 입력"
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password', {
              required: '패스워드를 입력해주세요',
              validate: (value) => {
                const { result } = validatePassword(value);

                if (result === true) return true;

                return '패스워드 형식이 아닙니다';
              },
            })}
            className="flex-1 bg-transparent pl-4 focus:border-none focus:outline-none"
          />
          <div className="box-border flex items-center p-4">
            <button type="button" onClick={handleTogglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
        <div className="relative mx-auto mt-6 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid placeholder-[#DBDEE1]">
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
            className="flex-1 bg-transparent pl-4 focus:border-none focus:outline-none"
          />
          <div className="box-border flex items-center p-4">
            <button type="button" onClick={handleTogglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          sizeTheme="medium"
          className="mx-auto mt-14 box-border font-bold"
          bgColorTheme={
            (getValues('password') === undefined && getValues('passwordCheck') === undefined) ||
            getValues('password') !== getValues('passwordCheck')
              ? 'lightgray'
              : 'orange'
          }
          textColorTheme="white"
          disabled={
            !getValues('password') ||
            !getValues('passwordCheck') ||
            getValues('password') !== getValues('passwordCheck')
          }
        >
          다음
        </Button>
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
      </form>
    </div>
  );
}
export default PasswordForm;
