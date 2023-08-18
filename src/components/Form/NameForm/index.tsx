'use client';

import Button from '@/components/Button/Button';
import { useFormContext } from 'react-hook-form';
import { validateFullName } from '@/util/validate';

import { UseStepFormContext } from '../StepForm';
import FormTitle from '../FormTitle';
import ResetValueInput from '@/components/Input/StepFormInput/ResetValueInput';

export interface NameForm {
  fullName: string;
}

function NameForm() {
  const {
    register,
    handleSubmit,
    done,
    formState: { errors, isValid },
  } = useFormContext<NameForm>() as UseStepFormContext<NameForm>;

  const title = `
    이름을 
    입력해주세요.
  `;

  const onSubmit = (data: NameForm) => {
    done();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title={title} />
      <ResetValueInput
        placeholder="이름 입력"
        {...register('fullName', {
          validate: (value) => {
            const { result } = validateFullName(value);

            if (result === true) return true;

            return '공백을 포함하지 않는 영문(대소문자) 또는 한글로만 작성가능합니다';
          },
        })}
      />
      <Button
        type="submit"
        disabled={!isValid}
        className="mt-14 font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
        sizeTheme="fullWidth"
        bgColorTheme="orange"
        textColorTheme="white"
      >
        다음
      </Button>
    </form>
  );
}
export default NameForm;
