'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useController, useFormContext } from 'react-hook-form';
import { FreeTrialFormData } from '@/interfaces/FormData';
import { useId } from 'react';
import { freeTierStartDateRules } from './freeTierStartDateRules';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

function FreeTierStartDateInput() {
  const { control } = useFormContext<FreeTrialFormData>();
  const { field, fieldState } = useController({
    control,
    name: 'freeTierStartDate',
    rules: freeTierStartDateRules,
  });

  const id = useId();

  const fieldId = `${id}-${field.name}`;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-0.5 text-xs font-medium">
        무료체험 시작일
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          format="YYYY-MM-DD"
          disablePast={true}
          slotProps={{
            textField: {
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : ' ',
            },
            openPickerButton: {
              id: fieldId,
            },
          }}
          sx={{ width: '100%' }}
          defaultValue={null}
          onChange={(date: dayjs.Dayjs | null) => field.onChange(dayjs(date).format('YYYY-MM-DD'))}
          value={!field.value ? null : dayjs(field.value)}
        />
      </LocalizationProvider>
    </div>
  );
}

export default FreeTierStartDateInput;
