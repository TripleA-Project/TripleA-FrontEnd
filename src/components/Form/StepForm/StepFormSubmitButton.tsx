'use client';

import { useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '.';

interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {
  defaultStepTitle?: string;
  lastStepTitle?: string;
  renderButton?: ({
    type,
    defaultStepTitle,
    lastStepTitle,
    isLastStep,
  }: {
    type: 'submit';
    defaultStepTitle: string;
    lastStepTitle: string;
    isLastStep: boolean;
  }) => JSX.Element;
}

/**
 * StepFormSubmit버튼
 * 
 * - `defaultStepTitle` : 마지막 step이 아닐 때 버튼의 text
 * - `lastStepTitle` : 마지막 step일 때 버튼의 text
 * - `renderButton` : 사용자 정의 컴포넌트로 StepFormSubmit 버튼을 렌더링 하고 싶을 때 사용
 *   - ({ `type`: 'submit', `defaultStepTitle`, `lastStepTitle`, `isLastStep` }) => JSX.Element 
 *   - `isLastStep` : 마지막 step일 경우 true
 * 
 * ```tsx
 * //예시
  <StepFormSubmitButton
    renderButton={({ type, defaultStepTitle, lastStepTitle, isLastStep }) => (
      <Button type={type}>Custom {isLastStep ? lastStepTitle : defaultStepTitle}</Button>
    )}
  />
 * ```
 * @returns JSX.Element
 */
function StepFormSubmitButton({
  defaultStepTitle = '다음',
  lastStepTitle = '완료',
  renderButton,
  type,
  className,
  ...props
}: SubmitButtonProps) {
  const { isLastStep } = useFormContext() as UseStepFormContext;

  return renderButton ? (
    renderButton({ type: 'submit', defaultStepTitle, lastStepTitle, isLastStep })
  ) : (
    <button type="submit" {...(className && { className })} {...props}>
      {isLastStep ? lastStepTitle : defaultStepTitle}
    </button>
  );
}

export default StepFormSubmitButton;
