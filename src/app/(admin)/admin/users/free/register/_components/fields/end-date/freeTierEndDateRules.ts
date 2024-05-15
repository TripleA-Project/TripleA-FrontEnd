import { FreeTrialFormData } from '@/interfaces/FormData';
import { validateDateFormat } from '@/util/validate';
import { RegisterOptions } from 'react-hook-form';

type FreeTierEndDateRules = Omit<
  RegisterOptions<FreeTrialFormData, 'freeTierEndDate'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const freeTierEndDateRules: FreeTierEndDateRules = {
  required: '무료체험 종료일을 입력해 주세요',
  validate: (dateFormat) => {
    if (!validateDateFormat(dateFormat)) {
      return 'YYYY-MM-DD 형식의 문자열을 입력해 주세요';
    }

    return true;
  },
};
