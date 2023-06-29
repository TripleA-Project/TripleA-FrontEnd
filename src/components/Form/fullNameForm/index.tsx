'use client';

import Button from '@/components/Button/Button';
import { FieldErrors, useForm, useFormContext } from 'react-hook-form';
import { validateFullName } from '@/util/validate';

import { UseStepFormContext } from '../StepForm';

export interface FullNameFormData {
  fullName: string;
}

function FullNameForm() {
  const {
    register,
    handleSubmit,
    done,
    skip,
    prev,
    formState: { errors, isValid },
  } = useFormContext<FullNameFormData>() as UseStepFormContext<FullNameFormData>;

  const onSubmit = (data: FullNameFormData) => {
    console.log('FullNameForm: ', { data });
    done();
  };
  const onInvalid = (errors: FieldErrors<FullNameFormData>) => {
    console.log('error:', errors);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="pt-[54px]">
        <div className="flex pt-[25px] text-lg font-semibold">
          로그인에 사용할 <br />
          이름을 입력해주세요
        </div>
        <input
          placeholder="이름 입력"
          id="fullName"
          {...register('fullName', {
            validate: (value) => {
              const { result } = validateFullName(value);

              if (result === true) return true;

              return '영문(대소문자) 혹은 한글로만 작성가능합니다';
            },
          })}
          className="mx-auto mt-6 flex h-[46px] w-full rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
        />
        <Button
          type="submit"
          className="mx-auto mt-14 box-border font-bold "
          sizeTheme="fullWidth"
          bgColorTheme={isValid ? 'orange' : 'lightgray'}
          textColorTheme="white"
          // onClick={handleClickButton}
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
export default FullNameForm;
