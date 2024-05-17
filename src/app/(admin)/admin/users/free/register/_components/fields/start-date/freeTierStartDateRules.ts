import { FreeTrialFormData } from '@/interfaces/FormData';
import { validateDateFormat } from '@/util/validate';
import dayjs from 'dayjs';
import { RegisterOptions } from 'react-hook-form';

type FreeTierStateDateRules = Omit<
  RegisterOptions<FreeTrialFormData, 'freeTierStartDate'>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const freeTierStartDateRules: FreeTierStateDateRules = {
  required: '무료체험 시작일을 입력해 주세요',
  validate: (dateFormat, values) => {
    if (!validateDateFormat(dateFormat)) {
      return 'YYYY-MM-DD 형식의 문자열을 입력해 주세요';
    }

    const now = dayjs().startOf('days');
    const startDate = dayjs(dateFormat);
    const endDate = values.freeTierEndDate ? dayjs(values.freeTierEndDate) : null;

    if (startDate.isBefore(now)) {
      return `${now.format('YYYY-MM-DD')}부터 선택 가능합니다.`;
    }

    if (endDate && startDate.isAfter(endDate)) {
      return '시작일은 종료일보다 늦을 수 없습니다';
    }

    return true;
  },
};
