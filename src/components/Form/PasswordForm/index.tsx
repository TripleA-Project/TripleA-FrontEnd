'use client';

import { type SubmitHandler, useFormContext } from 'react-hook-form';
import { type UseStepFormContext } from '../StepForm';
import Button from '@/components/Button/Button';
import FormTitle from '../FormTitle';
import ReadOnlyInput from '@/components/Input/StepFormInput/ReadOnlyInput';
import PasswordInput from '@/components/Input/StepFormInput/PasswordInput';
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
    formState: { isValid },
  } = useFormContext() as UseStepFormContext<PasswordForm>;

  const title = `
    로그인에 사용할
    비밀번호를 입력해주세요.
  `;

  const onValid: SubmitHandler<PasswordForm> = () => {
    done();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <FormTitle title={title} />
      <div className="space-y-6">
        <ReadOnlyInput fieldName="email" />
        <PasswordInput
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            validate(value) {
              const { result, type } = validatePassword(value);

              if (result === true) return true;

              if (type === 'passwordLength') return '패스워드는 8자 이상, 16자 이하입니다';
              if (type === 'notAllowedChar') return '패스워드는 영문 대소문자, 0-9 숫자로 구성되어야 합니다';
              if (type === 'NotContainSpecial') return '최소 1개 이상의 특수문자가 포함되어야 합니다';

              return '유효하지 않은 비밀번호입니다';
            },
          })}
        />
        <PasswordInput
          placeholder="비밀번호 확인"
          {...register('passwordCheck', {
            required: '비밀번호 확인을 입력해주세요',
            validate(value) {
              return getValues().password === value ? true : '입력한 비밀번호와 같지 않습니다';
            },
          })}
        />
      </div>
      <Button
        type="submit"
        sizeTheme="fullWidth"
        className="mt-8 font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
        bgColorTheme="orange"
        textColorTheme="white"
        disabled={!isValid}
      >
        다음
      </Button>
    </form>
  );
}
export default PasswordForm;
