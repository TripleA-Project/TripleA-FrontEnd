import { FreeTrialFormData } from '@/interfaces/FormData';
import { validateDateFormat } from '@/util/validate';
import dayjs from 'dayjs';
import { RegisterOptions } from 'react-hook-form';

type FreeTierEndDateRules = Omit<
  RegisterOptions<FreeTrialFormData, 'freeTierEndDate'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const freeTierEndDateRules: FreeTierEndDateRules = {
  required: '무료체험 종료일을 입력해 주세요',
  validate: (dateFormat, values) => {
    if (!validateDateFormat(dateFormat)) {
      return 'YYYY-MM-DD 형식의 문자열을 입력해 주세요';
    }

    const now = dayjs().startOf('days');
    const startDate = values.freeTierStartDate ? dayjs(values.freeTierStartDate) : null;
    const endDate = dayjs(dateFormat);

    if (endDate.isBefore(now)) {
      return `${now.format('YYYY-MM-DD')}부터 선택 가능합니다.`;
    }

    if (startDate && endDate.isBefore(startDate)) {
      return '종료일은 시작일보다 빠를 수 없습니다';
    }

    return true;
  },
};
