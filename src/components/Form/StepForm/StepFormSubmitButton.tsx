'use client';

import { useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '.';

interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
  defaultStepTitle?: string;
  lastStepTitle?: string;
}

function StepFormSubmitButton({
  defaultStepTitle = '다음',
  lastStepTitle = '완료',
  type,
  className,
  ...props
}: SubmitButtonProps) {
  const { isLastStep } = useFormContext() as UseStepFormContext;

  return (
    <button type="submit" className={`absolute bottom-0 left-0 ${className}`} {...props}>
      {isLastStep ? lastStepTitle : defaultStepTitle}
    </button>
  );
}

export default StepFormSubmitButton;
