'use client';

import { FreeTrialFormData } from '@/interfaces/FormData';
import { FormProvider, useForm } from 'react-hook-form';

interface FormContextProps {
  children: React.ReactNode;
}

function FormContext({ children }: FormContextProps) {
  const methods = useForm<FreeTrialFormData>({
    defaultValues: {
      idList: [],
      freeTierStartDate: '',
      freeTierEndDate: '',
      memo: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default FormContext;
