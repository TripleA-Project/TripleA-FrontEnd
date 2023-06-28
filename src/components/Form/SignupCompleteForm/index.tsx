'use client';

import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '../StepForm';
import Button from '@/components/Button/Button';

export default function SignupCompleteForm() {
  const { handleSubmit, done, prev, getValues } = useFormContext() as UseStepFormContext;

  console.log('complete: ', { values: getValues() });

  const onValid = (data: FieldValues) => {
    console.log('complete: ', { data });
    done();
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log({ errors });
  };

  return (
    <div>
      <form className="h-[600px]" onSubmit={handleSubmit(onValid, onInvalid)}>
        완료
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
        <Button
          type="submit"
          className="mx-auto mt-2 box-border font-bold "
          sizeTheme="medium"
          bgColorTheme="lightgray"
          textColorTheme="white"
        >
          test
        </Button>
      </form>
    </div>
  );
}
