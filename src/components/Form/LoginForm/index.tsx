'use client';

import { type FieldErrors, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import { login } from '@/service/auth';
import { setCookie } from '@/util/cookies';
import { type LoginRequest } from '@/interfaces/Dto/Auth';
import { ExistORNotFoundUserError } from '@/errors/ExistORNotFoundUserError';
import { useEffect } from 'react';
import { validateEmail, validatePassword } from '@/util/validate';

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginRequest>();

  const { mutate: loginRequest, status } = useMutation({
    mutationFn: login,
    onSuccess: ({ headers }) => {
      console.log('[로그인 성공]');

      const accessToken = headers['authorization'];

      if (accessToken) {
        setCookie('accessToken', (accessToken as string).replace('Bearer ', ''), { path: '/', maxAge: 60 * 5 });
      }
    },
    onError: (error) => {
      console.log('[로그인 에러]');
      console.log(error);

      setError('root', { message: ExistORNotFoundUserError.message });
    },
  });

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === 'change' && errors.root) {
        clearErrors('root');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]); // eslint-disable-line

  const onValid = ({ email, password }: LoginRequest) => {
    loginRequest({ email, password });
  };

  const onInvalid = ({ email, password }: FieldErrors<LoginRequest>) => {
    console.log('이메일 에러: ', { email });
    console.log('패스워드 에러: ', { password });
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: '이메일은 필수 입력 항목 입니다',
            validate: (value) => {
              const validation = validateEmail(value);

              if (validation.result === true) return true;

              return '유효한 email 형식이 아닙니다';
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="password">패스워드</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: '비밀번호는 필수 입력 항목 입니다',
            validate: (value) => {
              const validation = validatePassword(value);

              if (validation.result === true) return true;

              return validation.type;
            },
          })}
        />
      </div>
      {errors?.root ? <span className="text-red-600">{errors.root.message}</span> : null}
      <Button
        disabled={!isValid}
        className="disabled:cursor-not-allowed disabled:bg-violet-200 disabled:hover:bg-violet-200"
        type="submit"
        bgColorTheme="violet"
        textColorTheme="white"
        clickHandler={() => {}}
      >
        로그인
      </Button>
    </form>
  );
}

export default LoginForm;
