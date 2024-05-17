'use client';

import { FormProvider, useForm } from 'react-hook-form';

export interface FreeTierUserSearchFormData {
  email: string;
  fullName: string;
  freeTierStartDate: string;
  freeTierEndDate: string;
  memo: string;
}

interface FormContextProps {
  children: React.ReactNode;
}

function SearchFormContext({ children }: FormContextProps) {
  const methods = useForm<FreeTierUserSearchFormData>({
    defaultValues: {
      email: '',
      fullName: '',
      freeTierStartDate: '',
      freeTierEndDate: '',
      memo: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default SearchFormContext;
