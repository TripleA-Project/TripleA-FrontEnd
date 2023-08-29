'use client';

import { useRef } from 'react';
import { type SubmitHandler, useFormContext } from 'react-hook-form';
import { type UseStepFormContext } from '../StepForm';
import Button from '@/components/Button/Button';
import FormTitle from '../FormTitle';
import ReadOnlyInput from '@/components/Input/StepFormInput/ReadOnlyInput';
import PasswordInput from '@/components/Input/StepFormInput/PasswordInput';
import { CheckList, createCheckList } from './CheckList';
import { validatePassword } from '@/util/validate';

export interface PasswordForm {
  password: string;
  passwordCheck: string;
}

function PasswordForm() {
  const {
    register,
    handleSubmit,
    done,
    getValues,
    trigger,
    formState: { isValid },
  } = useFormContext() as UseStepFormContext<PasswordForm>;

  const checkListOfPasswordRef = useRef<HTMLDivElement>(null);
  const checkListOfPasswordCheckRef = useRef<HTMLDivElement>(null);

  const title = `
    로그인에 사용할
    비밀번호를 입력해주세요.
  `;

  const getCheckListOfPassword = () => {
    const password = getValues().password;

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
      ],
    });
  };

  const getCheckListOfPasswordCheck = () => {
    return createCheckList({
      checkList: [
        {
          label: '입력한 비밀번호와 같음',
          rule: getValues('password') === getValues('passwordCheck'),
        },
      ],
    });
  };

  const onValid: SubmitHandler<PasswordForm> = () => {
    done();
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      onFocus={(e) => {
        const target = e.target;

        if (target.name === 'password') {
          if (checkListOfPasswordRef.current) {
            checkListOfPasswordRef.current.style.height = checkListOfPasswordRef.current.scrollHeight + 'px';
          }
          if (checkListOfPasswordCheckRef.current) {
            checkListOfPasswordCheckRef.current.style.removeProperty('height');
          }
        }

        if (target.name === 'passwordCheck') {
          if (checkListOfPasswordCheckRef.current) {
            checkListOfPasswordCheckRef.current.style.height = checkListOfPasswordCheckRef.current.scrollHeight + 'px';
          }
          if (checkListOfPasswordRef.current) {
            checkListOfPasswordRef.current.style.removeProperty('height');
          }
        }
      }}
      onChange={() => {
        trigger('password');
        trigger('passwordCheck');
      }}
    >
      <FormTitle title={title} />
      <div className="space-y-6">
        <ReadOnlyInput fieldName="email" />
        <div className="space-y-2">
          <PasswordInput
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              validate(value) {
                const { result, type } = validatePassword(value);

                if (result === true) {
                  return true;
                }

                if (type === 'passwordLength') {
                  return '패스워드는 8자 이상, 16자 이하입니다';
                }

                if (type === 'notAllowedChar') {
                  return '패스워드는 영문 대소문자, 0-9 숫자로 구성되어야 합니다';
                }

                if (type === 'NotContainSpecial') {
                  return '최소 1개 이상의 특수문자가 포함되어야 합니다';
                }

                return '유효하지 않은 비밀번호입니다';
              },
            })}
          />
        </div>
        <CheckList
          ref={checkListOfPasswordRef}
          checkList={getCheckListOfPassword()}
          className="!mt-2 h-0 space-y-2 overflow-hidden transition-[height]"
        />
        <div className="space-y-2">
          <PasswordInput
            placeholder="비밀번호 확인"
            {...register('passwordCheck', {
              validate(value, formData) {
                if (formData.password === value) {
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
          className="!mt-2 h-0 overflow-hidden transition-[height]"
        />
      </div>
      <Button
        type="submit"
        className="mt-8 font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
        bgColorTheme="orange"
        textColorTheme="white"
        disabled={!isValid}
        fullWidth
      >
        다음
      </Button>
    </form>
  );
}
export default PasswordForm;
