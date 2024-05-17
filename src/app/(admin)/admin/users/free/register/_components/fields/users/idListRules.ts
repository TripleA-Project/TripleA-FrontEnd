import { FreeTrialFormData } from '@/interfaces/FormData';
import { UseFieldArrayProps } from 'react-hook-form';

type IdListRules = NonNullable<UseFieldArrayProps<FreeTrialFormData, 'idList', 'id'>['rules']>;

export const idListRules: IdListRules = {
  required: '무료체험을 등록할 유저를 입력해 주세요',
};
