import { RegisterOptions } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';

type SearchMemoRules = Omit<
  RegisterOptions<FreeTierUserSearchFormData, 'memo'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const searchMemoRules: SearchMemoRules = {
  required: '메모 내용을 입력해 주세요',
};
