'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import { isAxiosError } from 'axios';
import Button from '@/components/Button/Button';
import PasswordInput from '@/components/Input/StepFormInput/PasswordInput';
import { CheckList, createCheckList } from '../PasswordForm/CheckList';
import { toastNotify } from '@/util/toastNotify';
import { validatePassword } from '@/util/validate';
import { type UseStepFormContext } from '../StepForm';
import { type APIResponse } from '@/interfaces/Dto/Core';
import { updateUserData } from '@/util/actions';

interface EditPasswordForm {
  newPassword: string;
  newPasswordCheck: string;
}

interface EditProfilesFormProps {
  hideHeader?: boolean;
}

function EditPasswordForm(props: EditProfilesFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { errors, isValid },
    done,
  } = useFormContext() as UseStepFormContext<EditPasswordForm>;

  const navRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLDivElement | null>(null);

  const checkListOfPasswordRef = useRef<HTMLDivElement>(null);
  const checkListOfPasswordCheckRef = useRef<HTMLDivElement>(null);

  watch((value, { type }) => {
    if (type === 'change' && errors.root) {
      clearErrors('root');
    }
  });

  const handleClick = (e: MouseEvent) => {
    if (!isMobile) return;

    const activeElement = document.activeElement;

    if (activeElement?.tagName === 'INPUT') {
      document.body.style.height = window.screen.height - 115 + 'px';
      document.body.style.transform = 'translateY(0)';

      formRef.current!.style.height = '100%';

      navRef.current!.style.marginTop = '-63px';

      return;
    }

    document.body.style.removeProperty('height');
    document.body.style.removeProperty('transform');

    formRef.current?.style.removeProperty('height');

    navRef.current?.style.removeProperty('margin-top');
  };

  const getCheckListOfPassword = () => {
    const password = getValues('newPassword');

    const specialChars = `! @ # $ % ^ & * _ - + { } ; : , < . > ( )`;

    const passwordLengthRegExp = /^.{8,16}$/;
    const alphaRegExp = /[a-zA-Z]/g;
    const numberRegExp = /[0-9]/g;
    const isContainSpecialRegExp = /[\!@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>\(\)]/g;

    return createCheckList({
      checkList: [
        {
          label: '8자 이상 16자 이하',
          rule: !!(password?.length && passwordLengthRegExp.test(password)),
        },
        {
          label: '영문 소문자(a ~ z) 또는 대문자(A ~ Z)',
          rule: !!(password?.length && alphaRegExp.test(password)),
        },
        {
          label: '숫자 (0 ~ 9)',
          rule: !!(password?.length && numberRegExp.test(password)),
        },
        {
          label: `${specialChars} 중 최소 1개 이상 포함`,
          rule: !!(password?.length && isContainSpecialRegExp.test(password)),
        },
        {
          label: '현재 비밀번호와 다름',
          rule: !!(password?.length && password !== (getValues() as any).password),
        },
      ],
    });
  };

  const getCheckListOfPasswordCheck = () => {
    return createCheckList({
      checkList: [
        {
          label: '입력한 비밀번호와 같음',
          rule: getValues('newPassword') === getValues('newPasswordCheck'),
        },
      ],
    });
  };

  const onValid = async ({ newPassword, newPasswordCheck }: EditPasswordForm) => {
    const { email, fullName, password } = getValues() as any;

    try {
      const editPasswordResponse = await updateUserData({
        email,
        fullName,
        password,
        passwordCheck: password,
        newPassword,
        newPasswordCheck,
      });

      if (editPasswordResponse.result === 'success') {
        done();
      }

      if (editPasswordResponse.result === 'error') {
        throw editPasswordResponse.error;
      }
    } catch (err) {
      if (isAxiosError<APIResponse<{ key: string; value: string }>>(err)) {
        const { response } = err;

        setError('root', {
          type: 'validate',
          message: response?.data.data ? response.data.data.value : response?.data.msg,
        });

        toastNotify('error', '유효한 비밀번호가 아닙니다.');
      }
    }
  };

  useEffect(() => {
    if (!navRef.current) {
      navRef.current = document.querySelector('nav');
    }

    if (!submitButtonRef.current) {
      submitButtonRef.current = document.getElementById('submitButtonWrapper') as HTMLDivElement | null;
    }

    window.addEventListener('click', handleClick);

    return () => {
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('transform');

      navRef.current?.style.removeProperty('margin-top');

      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <form
        ref={formRef}
        id="editPassword"
        onSubmit={handleSubmit(onValid)}
        className="flex h-[calc(100vh-242px)] flex-col items-center justify-center gap-8"
        onFocus={(e) => {
          const target = e.target;

          if (target.name === 'newPassword') {
            if (checkListOfPasswordRef.current) {
              checkListOfPasswordRef.current.style.height = checkListOfPasswordRef.current.scrollHeight + 'px';
            }
            if (checkListOfPasswordCheckRef.current) {
              checkListOfPasswordCheckRef.current.style.removeProperty('height');
            }
          }

          if (target.name === 'newPasswordCheck') {
            if (checkListOfPasswordCheckRef.current) {
              checkListOfPasswordCheckRef.current.style.height =
                checkListOfPasswordCheckRef.current.scrollHeight + 'px';
            }
            if (checkListOfPasswordRef.current) {
              checkListOfPasswordRef.current.style.removeProperty('height');
            }
          }
        }}
        onChange={() => {
          trigger('newPassword');
          trigger('newPasswordCheck');
        }}
      >
        <div className="w-full">
          <label htmlFor="newPassword">새로운 비밀번호</label>
          <PasswordInput
            id="newPassword"
            {...register('newPassword', {
              required: '비밀번호를 입력해주세요',
              validate(value) {
                const { result, type } = validatePassword(value);

                const currentPassword = (getValues() as any).password;
                if (value === currentPassword) return '현재 비밀번호와 다른 비밀번호를 입력해주세요';

                if (result === true) return true;

                if (type === 'passwordLength') return '패스워드는 8자 이상, 16자 이하입니다';
                if (type === 'notAllowedChar') return '패스워드는 영문 대소문자, 0-9 숫자로 구성되어야 합니다';
                if (type === 'NotContainSpecial') return '최소 1개 이상의 특수문자가 포함되어야 합니다';

                return '유효하지 않은 비밀번호입니다';
              },
            })}
          />
        </div>
        <CheckList
          ref={checkListOfPasswordRef}
          checkList={getCheckListOfPassword()}
          className={`h-0 space-y-2 self-start overflow-hidden transition-[height] ${isMobile ? 'shrink-0' : ''}`}
        />
        <div className="w-full">
          <label htmlFor="newPasswordCheck">새로운 비밀번호 확인</label>
          <PasswordInput
            id="newPasswordCheck"
            {...register('newPasswordCheck', {
              validate(value, formData) {
                if (formData.newPassword === value) {
                  return true;
                }

                return '입력한 비밀번호와 같지 않습니다';
              },
            })}
          />
        </div>
        <CheckList
          ref={checkListOfPasswordCheckRef}
          checkList={getCheckListOfPasswordCheck()}
          className={`h-0 space-y-2 self-start overflow-hidden transition-[height] ${isMobile ? 'shrink-0' : ''}`}
        />
        {errors.root ? <span className="text-xs text-error">{errors.root.message}</span> : null}
        <div id="submitButtonWrapper" className="fixed bottom-[64px] left-0 flex w-full shrink-0 justify-center">
          <Button
            type="submit"
            form="editPassword"
            bgColorTheme="orange"
            className="!h-[54px] !rounded-md disabled:!cursor-default disabled:!bg-[#DBDEE1]"
            textColorTheme="white"
            disabled={!isValid}
          >
            변경완료
          </Button>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default EditPasswordForm;
