'use client';

import {
  AdminUserSearch,
  setSearch,
  useAdminUserSearch,
  useAdminUserSearchStatus,
} from '@/redux/slice/adminUserSearchSlice';
import { Control, Controller, ControllerRenderProps, UseFormResetField, useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Select, { SingleValue } from 'react-select';
import { Input } from '@mui/material';
import { SearchFormData } from '../userTable/UserTableContainer';
import { MutationObserverBaseResult, useMutation } from '@tanstack/react-query';
import { searchSiteUser } from '@/service/admin';
import { SearchSiteUserRequest } from '@/interfaces/Dto/Admin/SearchSiteUserDto';
import { setUsers, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import { MEMBERSHIP, MEMBER_ROLE } from '@/interfaces/User';
import Button from '@/components/Button/Button';
import { SearchIcon } from '@/components/Icons/SearchIcon';
import { toastNotify } from '@/util/toastNotify';

export interface UserSearchProps {
  onSearch: (status: MutationObserverBaseResult['status']) => void;
}

function getFormInitialValues(type: AdminUserSearch['type']) {
  switch (type) {
    case 'memberRole':
      return {
        searchType: 'memberRole',
        searchValue: 'USER',
      };
    case 'membership':
      return {
        searchType: 'membership',
        searchValue: 'BASIC',
      };
    case 'email':
    case 'fullName':
    default:
      return {
        searchType: type ?? 'email',
        searchValue: '',
      };
  }
}
function UserSearch({ onSearch }: UserSearchProps) {
  const { search: searchState } = useAdminUserSearch();
  const { control, handleSubmit, resetField } = useForm<SearchFormData>({
    values: {
      ...(getFormInitialValues(searchState.type) as any),
    },
  });

  const { dispatch } = useAdminUserList();

  const { mutate: search, status } = useMutation(
    ({ type, content }: SearchSiteUserRequest) => searchSiteUser({ type, content: content as any }),
    {
      onSuccess(response) {
        dispatch(setUsers(response.data.data ?? []));
      },
    },
  );

  const onSubmit = async ({ searchType, searchValue }: SearchFormData) => {
    if (status === 'loading') {
      toastNotify('error', '검색 중 입니다. 잠시만 기다려주세요.');

      return;
    }

    if (!searchValue) {
      if (searchType === 'email') {
        toastNotify('error', '이메일을 입력해주세요.');
        return;
      }

      if (searchType === 'fullName') {
        toastNotify('error', '이름을 입력해주세요.');
        return;
      }

      return;
    }

    search({ type: searchType, content: searchValue as any });

    dispatch(
      setSearch({
        ...searchState,
        value: '',
        recent: {
          type: searchType,
          value: searchValue,
        },
      }),
    );

    if (searchType !== 'membership' && searchType !== 'memberRole') {
      resetField('searchValue');
    }
  };

  useEffect(() => {
    onSearch(status);
  }, [status]); /* eslint-disable-line */

  return (
    <div className="box-border flex h-full w-full flex-wrap items-center gap-1 py-4">
      <div className="flex">
        <form className="flex gap-1" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <UserSearch.SearchTypeSelect control={control} />
          </div>
          <div className="flex flex-1 items-center">
            <UserSearch.SearchInput control={control} />
            <Button
              className="group h-full w-fit shrink-0 gap-2 px-2 py-1 text-xs"
              bgColorTheme="none"
              textColorTheme="black"
              type="submit"
            >
              <SearchIcon
                width={'1em'}
                height={'1em'}
                className="text-base transition-colors duration-200 group-hover:[&>*]:stroke-[#FD954A]"
              />
              <span className="sr-only">검색</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSearch;

UserSearch.SearchTypeSelect = function AdminUserSearchTypeSelect({
  control,
}: {
  control: Control<SearchFormData, any, SearchFormData>;
}) {
  const { search, dispatch } = useAdminUserSearch();
  const { searchStatus } = useAdminUserSearchStatus();

  const selectRef = useRef<any>(null);

  const options = [
    { label: '이메일', value: 'email' },
    { label: '이름', value: 'fullName' },
    { label: '멤버십', value: 'membership' },
    { label: '권한', value: 'memberRole' },
  ];

  const handleChange =
    (field: ControllerRenderProps<SearchFormData, 'searchType'>) =>
    (e: SingleValue<{ label: string; value: string }>) => {
      const value = e!.value as any;

      field.onChange(value);

      selectRef.current?.blur();

      dispatch(
        setSearch({
          ...search,
          type: value,
          value: getFormInitialValues(value).searchValue,
        }),
      );
    };

  return (
    <Controller
      name="searchType"
      control={control}
      defaultValue={options[0].value as any}
      render={({ field }) => (
        <Select
          id={'filterType'}
          ref={selectRef}
          className="w-[95px] text-xs"
          isSearchable={false}
          value={options.find(({ value }) => value === search.type)}
          options={options}
          tabIndex={0}
          onChange={handleChange(field)}
          onBlur={field.onBlur}
          isDisabled={searchStatus === 'loading'}
        />
      )}
    />
  );
};

UserSearch.SearchInput = function UserSearchInput({
  control,
}: {
  control: Control<SearchFormData, any, SearchFormData>;
}) {
  const { search, dispatch } = useAdminUserSearch();
  const { searchStatus } = useAdminUserSearchStatus();

  const handleSearch: (
    field: ControllerRenderProps<SearchFormData, 'searchValue'>,
  ) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (field) => (e) => {
    const value = e.target.value;

    field.onChange(value);

    dispatch(
      setSearch({
        ...search,
        value,
      }),
    );
  };

  const placeholder = (userSearch: typeof search) => {
    switch (userSearch.type) {
      case 'email':
        return '검색할 이메일을 입력해주세요';
      case 'fullName':
        return '검색할 이름을 입력해주세요';
      default:
        return '';
    }
  };

  if (search.type === 'memberRole') {
    return <UserSearch.MemberRoleSelect control={control} />;
  }

  if (search.type === 'membership') {
    return <UserSearch.MembershipSelect control={control} />;
  }

  return (
    <Controller
      name="searchValue"
      control={control}
      render={({ field }) => (
        <Input
          name={field.name}
          ref={field.ref}
          className="w-[225px]"
          value={search.value}
          onChange={handleSearch(field)}
          onBlur={field.onBlur}
          placeholder={placeholder(search)}
          disabled={!search.type || searchStatus === 'loading'}
          aria-label="description"
          autoComplete="off"
        />
      )}
    />
  );
};

UserSearch.MemberRoleSelect = function UserMemberRoleSelect({
  control,
}: {
  control: Control<SearchFormData, any, SearchFormData>;
}) {
  const { search, dispatch } = useAdminUserSearch();
  const { searchStatus } = useAdminUserSearchStatus();

  const selectRef = useRef<any>(null);

  const options: Array<{ label: string; value: keyof typeof MEMBER_ROLE }> = [
    { label: '유저', value: 'USER' },
    { label: '관리자', value: 'ADMIN' },
  ];

  const handleChange =
    (field: ControllerRenderProps<SearchFormData, 'searchValue'>) =>
    (e: SingleValue<{ label: string; value: keyof typeof MEMBER_ROLE }>) => {
      const value = e!.value as any;

      field.onChange(value);

      selectRef.current?.blur();

      dispatch(
        setSearch({
          ...search,
          value,
        }),
      );
    };

  return (
    <Controller
      name="searchValue"
      control={control}
      render={({ field }) => (
        <Select
          ref={selectRef}
          className="text-xs"
          isSearchable={false}
          defaultValue={options[0]}
          options={options}
          onChange={handleChange(field)}
          isDisabled={searchStatus === 'loading'}
        />
      )}
    />
  );
};

UserSearch.MembershipSelect = function UserMembershipSelect({
  control,
}: {
  control: Control<SearchFormData, any, SearchFormData>;
}) {
  const { search, dispatch } = useAdminUserSearch();
  const { searchStatus } = useAdminUserSearchStatus();

  const selectRef = useRef<any>(null);

  const options: Array<{ label: string; value: keyof typeof MEMBERSHIP }> = [
    { label: '일반 유저', value: 'BASIC' },
    { label: '유료 구독', value: 'PREMIUM' },
  ];

  const handleChange =
    (field: ControllerRenderProps<SearchFormData, 'searchValue'>) =>
    (e: SingleValue<{ label: string; value: keyof typeof MEMBERSHIP }>) => {
      const value = e!.value as any;

      field.onChange(value);

      selectRef.current?.blur();

      dispatch(
        setSearch({
          ...search,
          value,
        }),
      );
    };

  return (
    <Controller
      name="searchValue"
      control={control}
      render={({ field }) => (
        <Select
          ref={selectRef}
          className="text-xs"
          isSearchable={false}
          defaultValue={options[0]}
          options={options}
          onChange={handleChange(field)}
          isDisabled={searchStatus === 'loading'}
        />
      )}
    />
  );
};
