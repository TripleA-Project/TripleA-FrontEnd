'use client';

import { FormProvider, useForm } from 'react-hook-form';

interface StepFormProps {
  children: React.ReactNode;
}

function StepForm({ children }: StepFormProps) {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default StepForm;
