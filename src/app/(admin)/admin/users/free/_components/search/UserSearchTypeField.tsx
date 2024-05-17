'use client';

import { ControllerRenderProps, useController, useForm, useFormContext } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../form-context/SearchFormContext';
import Select, { SingleValue } from 'react-select';
import { useRef } from 'react';
import { useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { AdminUserTypeKey } from '@/redux/slice/adminUserListSlice';

interface FreeTierUserSearchType {
  selectedSearchType: keyof FreeTierUserSearchFormData;
}

type FreeTierUserSearchTypeField = ControllerRenderProps<FreeTierUserSearchType, 'selectedSearchType'>;

interface UserSearchTypeFieldProps {
  onSearchTypeSelect: (selectedType: FreeTierUserSearchType['selectedSearchType']) => void;
}

function UserSearchTypeField({ onSearchTypeSelect }: UserSearchTypeFieldProps) {
  const {
    resetField: resetSearchValueField,
    formState: { isSubmitting },
  } = useFormContext<FreeTierUserSearchFormData>();

  const { control } = useForm<FreeTierUserSearchType>({
    defaultValues: {
      selectedSearchType: 'email',
    },
  });
  const { field } = useController({ control, name: 'selectedSearchType' });

  const { searchStatus } = useAdminUserSearchStatus<AdminUserTypeKey.FreeTierUsers>();

  const selectRef = useRef<any>(null);

  const options: { label: string; value: typeof field.value }[] = [
    { label: '이메일', value: 'email' },
    { label: '이름', value: 'fullName' },
    { label: '무료체험 시작일', value: 'freeTierStartDate' },
    { label: '무료체험 종료일', value: 'freeTierEndDate' },
    { label: '메모', value: 'memo' },
  ];

  const handleChange = (field: FreeTierUserSearchTypeField) => (item: SingleValue<(typeof options)[number]>) => {
    const prevField = field.value;

    field.onChange(item?.value ?? 'email');
    resetSearchValueField(prevField);
    selectRef.current?.blur();

    onSearchTypeSelect(item?.value ?? 'email');
  };

  return (
    <Select
      ref={selectRef}
      className="w-[146px] text-xs"
      isSearchable={false}
      isDisabled={isSubmitting || searchStatus === 'loading'}
      options={options}
      value={options.find(({ value }) => value === field.value)}
      onChange={handleChange(field)}
    />
  );
}

export default UserSearchTypeField;
