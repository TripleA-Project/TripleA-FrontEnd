import { RegisterOptions } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';
import { validateDateFormat } from '@/util/validate';

type SearchFreeTierEndDateRules = Omit<
  RegisterOptions<FreeTierUserSearchFormData, 'freeTierEndDate'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const searchFreeTierEndDateRules: SearchFreeTierEndDateRules = {
  required: '무료체험 종료일을 입력해 주세요',
  validate: (dateFormat) => {
    if (!validateDateFormat(dateFormat)) {
      return 'YYYY-MM-DD 형식의 문자열을 입력해 주세요';
    }

    return true;
  },
};
