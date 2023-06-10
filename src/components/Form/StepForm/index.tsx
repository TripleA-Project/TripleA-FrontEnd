'use client';

import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, FormProviderProps, useForm } from 'react-hook-form';
import Progress from './StepFormProgress';

export interface UseStepFormContext<T extends FieldValues = FieldValues> extends FormProviderProps<T> {
  isLastStep: boolean;
  skip: () => void;
  done: () => void;
  prev: () => void;
}

interface StepFormProps {
  renderStepProgressBar?: boolean;
  children: React.ReactNode;
}

/**
 * 단계별 폼(StepForm)
 * - (단계별 폼이기 때문에) 최소 2개 이상의 폼 컴포넌트를 chlidren으로 사용해야 됨
 * - StepForm 컴포넌트의 children 순서에 따라 단계별로 진행
 * - 개별 폼 컴포넌트는 reactHookForm을 적용한 개별 컴포넌트로 작성(폼의 독립성 유지)
 * - `renderStepProgressBar`: true인 경우 progressBar를 렌더링 함 (기본: true)
 * - useFormContext: 
 *   - `skip()` : 마지막 Step으로 이동
 *   - `done()` : 다음 step으로 이동, 마지막 step에서 호출된 경우 completed된 상태로 변하고 폼 컴포넌트가 렌더링 되지 않음
 *   - `isLastStep` : 마지막 Step인 경우 `true`, 아닌 경우 `false`
 *   - `prev()` : 이전 step으로 이동, 시작 step에서 호출된 경우 step은 시작 step으로 보정됨
 * 
 *   - 별도의 버튼을 생성해서 활용할 경우 type='button' 이 아니면 클릭할 때 submit이 트리거 되서 원하는 동작이 되지 않을수 있기 때문에 주의 
 * 
 *   - 나머지는 useForm에서 제공하는 것과 동일함 (register 등...)
 * 
 * `Form 컴포넌트 작성 예시`
 * ```tsx
  'use client'
  
  interface SignupFormData {
    name: string;
    password: string;
  }

  function SignupForm() {
    const { register, handleSubmit, done } = useFormContext() as UseStepFormContext<SignupFormData>;

    const onValid: SubmitHandler<SignupFormData> = (data) => {
      console.log({ data });
      done();
    };

    const onInvalid: SubmitErrorHandler<SignupFormData> = (errors) => {
      console.log({ errors });
    };

    return (
      <form className="h-[600px]" onSubmit={handleSubmit(onValid, onInvalid)}>
        SignupForm
        <div>
          <label htmlFor="name">이름</label>
          <input id="name" {...register('name')} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" {...register('password')} />
        </div>
        <StepFormSubmitButton />
      </form>
    );
  }

  export default SignupForm;
 ```
 * `StepForm 컴포넌트 사용하는 곳 작성 예시`
 *
 * ```tsx
  <StepForm>
    {...} // 단계별로 사용할 Form 컴포넌트를 순서대로 작성
    <CompleteLayout /> // 필요할 경우 별도의 완료 Form 컴포넌트를 작성
  </StepForm>
 ```
 * @returns JSX.Element | null
 */
const StepForm = ({ renderStepProgressBar = true, children }: StepFormProps) => {
  if (!Array.isArray(children)) throw new Error('최소 2개 이상의 폼요소가 필요합니다');
  const methods = useForm();

  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const lastStep = children.length;
  const isLastStep = step === lastStep;

  const skip = () => {
    setStep(lastStep);
  };

  const next = () => {
    setStep((prev) => {
      const nextStep = prev + 1;
      return nextStep > lastStep ? lastStep : nextStep;
    });
  };

  const prev = () => {
    setStep((prev) => {
      console.log({ prev });
      const prevStep = prev - 1;
      return prevStep < 1 ? 1 : prevStep;
    });
  };

  const done = () => {
    if (isLastStep) {
      setIsComplete(true);
      return;
    }

    next();
  };

  const FormList = Array.from(children as React.ReactElement[]);

  const CurrentForm = FormList[step - 1] ?? null;

  const providerProps = { ...methods, isLastStep, skip, done, prev };

  useEffect(() => {
    if (!methods.formState.isSubmitSuccessful) return;

    methods.reset({}, { keepValues: true });
  }, [methods.formState.isSubmitSuccessful]); /* eslint-disable-line */

  return !isComplete ? (
    <FormProvider {...providerProps}>
      <div className="relative box-border h-full">
        {renderStepProgressBar ? <Progress value={step} min={1} max={lastStep} /> : null}
        {CurrentForm}
      </div>
    </FormProvider>
  ) : null;
};

export default StepForm;
