'use client';

import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import ResetValueInput from '@/components/Input/ResetValueInput';
import Button from '@/components/Button/Button';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { findPassword } from '@/service/user';
import { toastNotify } from '@/util/toastNotify';
import { validateEmail, validateFullName } from '@/util/validate';
import { type FindPasswordRequest } from '@/interfaces/Dto/User';
import { type APIResponse } from '@/interfaces/Dto/Core';

interface FindPasswordFormData extends FindPasswordRequest {}
type FindPasswordFormFields = keyof FindPasswordFormData;

function FindPasswordForm() {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FindPasswordFormData>();

  const navRef = useRef<HTMLElement | null>(null);

  const { mutate: findPasswordMutate, status: findPasswordStatus } = useMutation(
    ({ email, fullName }: FindPasswordFormData) => findPassword({ email, fullName }),
    {
      retry: 0,
      onSuccess: (response, variables) => {
        toastNotify('success', `${variables.email}로 새 비밀번호를 발급했습니다.`);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (isAxiosError<APIResponse<string & { key?: string; value?: string }>>(error)) {
            const { response } = error;

            if (response?.data.status === HttpStatusCode.BadRequest) {
              const errorField = response.data.data?.key;
              const errorFieldMessage = response.data.data?.value;

              if (errorField) {
                setError(errorField as FindPasswordFormFields, { type: 'validate', message: errorFieldMessage });
              }

              return;
            }

            if (response?.data.status === HttpStatusCode.NotFound) {
              setError('root', { type: 'validate', message: '일치하는 계정을 찾을 수 없습니다.' });
            }
          }

          return;
        }
        toastNotify('error', `에러가 발생했습니다. 잠시 후 다시 이용해주세요.`);
      },
    },
  );

  watch((value, { type }) => {
    if (type === 'change' && errors.root) {
      clearErrors('root');
    }
  });

  const onValid = ({ email, fullName }: FindPasswordFormData) => {
    findPasswordMutate({ email, fullName });
  };

  function handleClick(e: MouseEvent) {
    if (!isMobile) return;

    const activeElement = document.activeElement;

    if (activeElement?.tagName === 'INPUT') {
      navRef.current!.style.position = 'relative';
      navRef.current!.style.marginTop = '-63px';

      return;
    }

    navRef.current?.style.removeProperty('position');
    navRef.current?.style.removeProperty('margin-top');
  }

  useEffect(() => {
    if (!navRef.current) {
      navRef.current = document.querySelector('nav');
    }

    window.addEventListener('click', handleClick);

    return () => {
      navRef.current?.style.removeProperty('position');
      navRef.current?.style.removeProperty('margin-top');

      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="box-border flex h-[calc(100vh-115px)] items-center justify-center px-4">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold">
              이메일(email)
            </label>
            <ResetValueInput
              type="email"
              id="email"
              errorMessage={errors?.email?.message}
              watch={watch}
              setValue={setValue}
              {...register('email', {
                required: '이메일은 필수 입력 항목입니다.',
                validate: (value) => {
                  const { result } = validateEmail(value);

                  if (result === true) return true;

                  return '이메일 형식이 아닙니다';
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-bold">
              이름(fullName)
            </label>
            <ResetValueInput
              id="fullName"
              errorMessage={errors?.fullName?.message}
              watch={watch}
              setValue={setValue}
              {...register('fullName', {
                required: '이름은 필수 입력 항목입니다.',
                validate: (value) => {
                  const { result } = validateFullName(value);

                  if (result === true) return true;

                  return '공백을 포함하지 않는 영문(대소문자) 또는 한글로만 작성가능합니다';
                },
              })}
            />
          </div>
        </div>
        <div className="mb-2 flex min-h-[1.25rem] items-center text-sm text-error">
          {errors.root?.message ? (
            <>
              <NotificationIcons.Error />
              <span>{errors.root.message}</span>
            </>
          ) : (
            ''
          )}
        </div>
        <Button
          type="submit"
          bgColorTheme="orange"
          textColorTheme="white"
          disabled={!isValid || findPasswordStatus === 'loading'}
          className="relative disabled:!bg-slate-300 disabled:!opacity-60"
        >
          {findPasswordStatus === 'loading' ? (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <div className="translate-y-[3.4px]">
                <MuiSpinner />
              </div>
            </div>
          ) : null}
          비밀번호 찾기
        </Button>
      </form>
    </div>
  );
}

export default FindPasswordForm;
