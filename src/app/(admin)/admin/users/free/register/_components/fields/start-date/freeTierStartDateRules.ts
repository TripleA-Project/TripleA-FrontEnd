import { FreeTrialFormData } from '@/interfaces/FormData';
import { validateDateFormat } from '@/util/validate';
import { RegisterOptions } from 'react-hook-form';

type FreeTierStateDateRules = Omit<
  RegisterOptions<FreeTrialFormData, 'freeTierStartDate'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const freeTierStartDateRules: FreeTierStateDateRules = {
  required: '무료체험 시작일을 입력해 주세요',
  validate: (dateFormat) => {
    if (!validateDateFormat(dateFormat)) {
      return 'YYYY-MM-DD 형식의 문자열을 입력해 주세요';
    }

    return true;
  },
};
