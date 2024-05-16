'use client';

import { FieldErrors, useFormContext } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../form-context/SearchFormContext';
import { useAdminUserSearch, useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { AdminUserTypeKey, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import UserSearchTypeField from './UserSearchTypeField';
import UserSearchValueField from './UserSearchValueField';
import { useEffect } from 'react';
import { FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import { toastNotify } from '@/util/toastNotify';
import { useSearchFreeTierUser } from './hooks/useSearchFreeTierUser';

interface UserSearchProps {
  freeTierUsers: FreeTrialUsersPayload;
}

function UserSearch({ freeTierUsers }: UserSearchProps) {
  const { handleSubmit, reset } = useFormContext<FreeTierUserSearchFormData>();

  const { setUsers } = useAdminUserList<AdminUserTypeKey.FreeTierUsers>();

  const { search, setSearch, dispatch } = useAdminUserSearch<AdminUserTypeKey.FreeTierUsers>();
  const { setSearchStatus } = useAdminUserSearchStatus<AdminUserTypeKey.FreeTierUsers>();

  const { searchFreeTierUser, searchFreeTierUserStatus } = useSearchFreeTierUser({
    onSuccess(data, variables, context) {
      reset();

      dispatch(setUsers(data));
    },
    onError(error, variables, context) {
      toastNotify('error', '검색중 에러가 발생했습니다');
    },
  });

  const searchSubmit = (data: FreeTierUserSearchFormData) => {
    const selectedSearchType = search.type;
    const payload = data[selectedSearchType];

    dispatch(
      setSearch({
        ...search,
        value: '',
        recent: {
          type: selectedSearchType,
          value: payload,
        },
      }),
    );

    searchFreeTierUser({ freeTierUsers, targetField: selectedSearchType, keyword: payload });
  };

  const onInvalid = (errors: FieldErrors<FreeTierUserSearchFormData>) => {
    const selectedSearchType = search.type;
    const targetError = errors[selectedSearchType];

    toastNotify('error', targetError?.message ?? '검색 중 에러가 발생했습니다');
  };

  useEffect(() => {
    return () => {
      dispatch(
        setSearch({
          recent: null,
          type: 'email',
          value: '',
        }),
      );
    };
  }, []); /* eslint-disable-line */

  useEffect(() => {
    dispatch(setSearchStatus(searchFreeTierUserStatus));
  }, [searchFreeTierUserStatus]); /* eslint-disable-line */

  return (
    <div className="box-border flex h-full w-full flex-wrap items-center gap-1 py-4">
      <div className="flex">
        <form className="flex flex-wrap gap-1" onSubmit={handleSubmit(searchSubmit, onInvalid)}>
          <div>
            <UserSearchTypeField
              onSearchTypeSelect={(selectedSearchType) => {
                dispatch(
                  setSearch({
                    ...search,
                    type: selectedSearchType,
                    value: '',
                  }),
                );
              }}
            />
          </div>
          <div className="relative">
            <UserSearchValueField />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSearch;
