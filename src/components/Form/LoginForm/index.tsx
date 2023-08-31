'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { MdCancel } from 'react-icons/md';
import { GrCircleAlert } from 'react-icons/gr';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { AppLogos } from '@/components/Icons';
import Button from '@/components/Button/Button';
import { login } from '@/service/auth';
import { validateEmail } from '@/util/validate';
import { deleteCookie, getCookie, setCookie } from '@/util/cookies';
import axios from 'axios';

export interface LoginFormProps {
  continueURL?: string;
}
export interface LoginForm {
  email: string;
  password: string;
  continue?: string;
}

function LoginForm({ continueURL }: LoginFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    watch,
    formState: { isValid, errors },
  } = useForm<LoginForm>();

  const { replace, refresh } = useRouter();

  const autoLoginRef = useRef<HTMLInputElement>(null);

  watch((value, { type }) => {
    if (type === 'change' && errors.root) {
      clearErrors('root');
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordIconClick = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async ({ email, password }: LoginForm) => {
    try {
      await deleteCookie('accessToken');

      const response = await login({ email, password });

      const accessToken = response.headers['authorization'] as string;
      const autoLogin = await getCookie('autoLogin');

      if (accessToken) {
        await setCookie('accessToken', accessToken.replace('Bearer ', ''), { path: '/', maxAge: 60 * 60 });
      }

      console.log('[login] ', response.headers['set-cookie']);

      if (autoLoginRef?.current) {
        if (autoLoginRef.current.checked && !autoLogin) {
          setCookie('autoLogin', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365 });
        }
        if (!autoLoginRef.current.checked && autoLogin) {
          deleteCookie('autoLogin');
        }
      }

      queryClient.removeQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries(['profile']);

      refresh();

      replace(continueURL ?? '/');

      return;
    } catch (error) {
      setError('root', { type: 'validate', message: 'login error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="-mt-[52px] box-border px-4">
      <div className="mt-[30px]">
        <div className="mb-3">
          <h2 className="mb-12 flex items-center justify-center gap-3 font-[900]">
            <AppLogos.Orange />
            Triple A
          </h2>
          <div className="space-y-[18px]">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#454C52]" htmlFor="email">
                이메일
              </label>
              <div
                className={`${
                  errors.email ? 'border-error' : watch().email ? 'border-black' : 'border-[#DBDEE1]'
                } relative flex h-[46px] w-full items-center rounded-lg border bg-white px-4 py-3 transition duration-300`}
              >
                <input
                  id="email"
                  type="email"
                  placeholder="이메일 입력"
                  className="flex-1 border-none text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal"
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    validate: (value) => {
                      const { result } = validateEmail(value);

                      if (result === true) return true;

                      return '이메일 형식이 아닙니다';
                    },
                  })}
                />
                <MdCancel
                  role="button"
                  className="shrink-0 cursor-pointer text-[18px] text-[#E5E7EC]"
                  onClick={() => {
                    setValue('email', '');
                  }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#454C52]" htmlFor="password">
                비밀번호
              </label>
              <div
                className={`${
                  errors.password ? 'border-error' : watch().password ? 'border-black' : 'border-[#DBDEE1]'
                } relative flex h-[46px] w-full items-center rounded-lg border bg-white px-4 py-3 transition duration-300`}
              >
                <input
                  placeholder="비밀번호 입력"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="flex-1 border-none bg-white text-sm font-semibold text-black outline-none placeholder:font-normal placeholder:text-[#DBDEE1]"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    validate: (value) => {
                      const passwordLength = /^.{8,16}$/;
                      const notAllowdChar = /[^a-zA-Z0-9\!\@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>\(\)]/g;
                      const isContainAllowdSpec = /[\!@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>\(\)]/g;

                      if (!passwordLength.test(value)) return '패스워드는 8자 이상, 16자 이하입니다';
                      if (notAllowdChar.test(value)) return '패스워드는 영문 대소문자, 0-9 숫자로 구성되어야 합니다';
                      if (!isContainAllowdSpec.test(value)) return '특수문자가 포함되어있지 않습니다';

                      return true;
                    },
                  })}
                />
                {showPassword ? (
                  <BsFillEyeSlashFill
                    role="button"
                    className="shrink-0 text-[18px] text-[#E5E7EC]"
                    onClick={handlePasswordIconClick}
                  />
                ) : (
                  <BsFillEyeFill
                    role="button"
                    className="shrink-0 text-[18px] text-[#E5E7EC]"
                    onClick={handlePasswordIconClick}
                  />
                )}
              </div>
            </div>
          </div>
          {errors.email || errors.password || errors.root ? (
            <div role="tooltip" className="mt-[18px] flex gap-1">
              <GrCircleAlert className="shrink-0 text-sm [&>path]:stroke-error" />
              <div className="text-xs font-medium text-error">
                이메일 또는 비밀번호를 잘못입력했습니다.
                <br />
                입력하신 내용을 다시 확인해주세요.
              </div>
            </div>
          ) : null}
          <Button
            disabled={!isValid}
            className="mt-10 box-border font-bold"
            sizeTheme="fullWidth"
            bgColorTheme={isValid ? 'orange' : 'lightgray'}
            textColorTheme="white"
          >
            로그인
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-5 items-center gap-1">
            <input ref={autoLoginRef} className="peer hidden" type="checkbox" id="auto-login" />
            <label
              className="cursor-pointer bg-[length:15px_15px] bg-[2.5px_center] bg-no-repeat pl-6 text-sm font-medium text-[#5B6267] peer-checked:bg-checked peer-[&:not(:checked)]:bg-notChecked"
              htmlFor="auto-login"
            >
              자동 로그인
            </label>
          </div>
          <Link href="/signup" className="text-sm font-medium text-[#5B6267] underline underline-offset-2">
            회원가입
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <Link href="/password" className="text-sm font-medium text-[#5B6267] underline underline-offset-2">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
