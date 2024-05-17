'use client';

import { useController, useFormContext } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';
import { Input } from '@mui/material';
import Button from '@/components/Button/Button';
import { SearchIcon } from '@/components/Icons/SearchIcon';
import { searchFullNameRules } from './fullNameRules';
import { useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { AdminUserTypeKey } from '@/redux/slice/adminUserListSlice';

function FullNameSearchField() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<FreeTierUserSearchFormData>();
  const { field } = useController({ control, name: 'fullName', rules: searchFullNameRules });

  const { searchStatus } = useAdminUserSearchStatus<AdminUserTypeKey.FreeTierUsers>();

  return (
    <div className="flex flex-1 items-center">
      <Input
        className="w-[225px]"
        placeholder="검색할 이름을 입력해 주세요"
        disabled={isSubmitting || searchStatus === 'loading'}
        value={field.value}
        onChange={field.onChange}
      />
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

export default FullNameSearchField;
