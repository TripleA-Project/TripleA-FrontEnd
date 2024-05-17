'use client';

import Button from '@/components/Button/Button';
import { SearchIcon } from '@/components/Icons/SearchIcon';
import { useController, useFormContext } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { TextField } from '@mui/material';
import { searchFreeTierStartDateRules } from './freeTierStartDateRules';
import { useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { AdminUserTypeKey } from '@/redux/slice/adminUserListSlice';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    padding: '4px',
    height: '38px',
    boxSizing: 'border-box',
  },
});

function FreeTierStartDateSearchField() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<FreeTierUserSearchFormData>();
  const { field } = useController({ control, name: 'freeTierStartDate', rules: searchFreeTierStartDateRules });

  const { searchStatus } = useAdminUserSearchStatus<AdminUserTypeKey.FreeTierUsers>();

  return (
    <div className="flex h-[38px] flex-1 items-center">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          format="YYYY-MM-DD"
          slots={{
            // @ts-ignore
            textField: StyledTextField,
          }}
          sx={{ width: '100%', height: '100%' }}
          disabled={isSubmitting || searchStatus === 'loading'}
          defaultValue={null}
          onChange={(date: dayjs.Dayjs | null) => field.onChange(dayjs(date).format('YYYY-MM-DD'))}
          value={!field.value ? null : dayjs(field.value)}
        />
      </LocalizationProvider>
      <Button
        className="group h-full w-fit shrink-0 gap-2 px-2 py-1 text-xs"
        bgColorTheme="none"
        textColorTheme="black"
        type="submit"
        disabled={isSubmitting || searchStatus === 'loading'}
      >
        <SearchIcon
          width={'1em'}
          height={'1em'}
          className="text-base transition-colors duration-200 group-hover:[&>*]:stroke-[#FD954A]"
        />
        <span className="sr-only">검색</span>
      </Button>
    </div>
  );
}

export default FreeTierStartDateSearchField;
