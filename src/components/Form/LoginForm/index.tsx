'use client';

import Button from '@/components/Button/Button';
import { validateEmail, validatePassword } from '@/util/validate';
import Image from 'next/image';
import Logo from '/public/Logo.svg';
import { FieldErrors, useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { login } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/util/cookies';

export interface LoginForm {
  email: string;
  password: string;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login({ email: data.email, password: data.password });

      const accessToken = response.headers['authorization'] as string;

      if (accessToken) {
        await setCookie('accessToken', accessToken.replace('Bearer ', ''), { path: '/', maxAge: 60 * 60 * 24 });
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const onInvalid = (errors: FieldErrors<LoginForm>) => {
    console.log('error:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="mx-auto ">
        <div className="mx-auto w-full">
          <div className="flex items-center justify-center  py-11 font-semibold">
            <Link href={'/login'} className="flex gap-3">
              <Image src={Logo} alt="Logo" />
              Triple A
            </Link>
          </div>
          <div className="flex flex-col">
            <label className="ml-4 text-xs font-semibold text-[#454C52]" htmlFor="email">
              이메일
            </label>
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
              className="mx-auto mt-1 flex h-[46px] w-full rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
            />
          </div>

          <div className="flex-coulmn mt-3">
            <label className="ml-4 text-xs font-semibold text-[#454C52]" htmlFor="password">
              비밀번호
            </label>
            <div className="relative mx-auto mt-1 flex h-[46px] w-full rounded-lg border-[1px] border-solid placeholder-[#DBDEE1]">
              <input
                placeholder="비밀번호 입력"
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="flex-1 bg-transparent pl-4 focus:border-none focus:outline-none"
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  validate: (value) => {
                    const { result, type } = validatePassword(value);

                    if (result === true) return true;

                    switch (type) {
                      case 'passwordLength':
                        return '8자에서 16자 이내로 작성해주세요';
                      case 'notAllowedChar':
                        return '영문 대소문자,0-9숫자와 `.`,`-`가 허용됩니다';
                    }
                  },
                })}
              />
              <div className="box-border flex items-center p-4">
                <button onClick={handleTogglePassword}>{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</button>
              </div>
            </div>
          </div>

          <div className="align-center mt-6">
            <input className="ml-4 shadow-none" type="checkbox" id="checkbox" value={'자동로그인'} />
            <label className="ml-2 text-sm text-[#5B6267]" htmlFor="checkbox">
              자동 로그인
            </label>
          </div>
          <Button
            disabled={!isValid}
            className="mx-auto mt-2 box-border font-bold "
            sizeTheme="fullWidth"
            bgColorTheme={isValid ? 'orange' : 'lightgray'}
            textColorTheme="white"
          >
            로그인
          </Button>
        </div>
        <div className="mx-auto ml-3 mt-3 flex">
          <Link className="text-xs text-[#454C52]" href="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
