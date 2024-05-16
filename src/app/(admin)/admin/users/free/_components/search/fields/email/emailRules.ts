import { RegisterOptions } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';

type SearchEmailRules = Omit<
  RegisterOptions<FreeTierUserSearchFormData, 'email'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const searchEmailRules: SearchEmailRules = {
  required: '이메일을 입력해주세요',
};
