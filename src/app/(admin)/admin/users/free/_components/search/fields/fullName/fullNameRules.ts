import { RegisterOptions } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';

type SearchFullNameRules = Omit<
  RegisterOptions<FreeTierUserSearchFormData, 'fullName'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const searchFullNameRules: SearchFullNameRules = {
  required: '이름을 입력해주세요',
};
