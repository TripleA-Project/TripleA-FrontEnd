'use client';

import Button from '@/components/Button/Button';
import { AdminUserTypeKey, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import { AdminUserSearch, useAdminUserSearch, useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { toastNotify } from '@/util/toastNotify';

function ResetFreeTierUserSearch() {
  const { search, setSearch } = useAdminUserSearch<AdminUserTypeKey.FreeTierUsers>();
  const { searchStatus, setSearchStatus } = useAdminUserSearchStatus<AdminUserTypeKey.FreeTierUsers>();
  const { dispatch, resetUsers } = useAdminUserList<AdminUserTypeKey.FreeTierUsers>();

  const resetUserList = () => {
    if (searchStatus === 'loading') {
      toastNotify('error', '검색 이후 초기화가 가능합니다.');

      return;
    }

    dispatch(
      setSearch({
        ...search,
        recent: null,
      }),
    );
    dispatch(setSearchStatus('idle'));
    dispatch(resetUsers());
  };

  return searchStatus !== 'idle' ? (
    <Button
      type="button"
      className="h-fit w-fit shrink-0 px-2 py-1 text-xs"
      bgColorTheme="orange"
      textColorTheme="white"
      onClick={resetUserList}
    >
      <span>{`"${getLabel(search)}"`}&nbsp;</span>
      <span>검색결과 초기화</span>
    </Button>
  ) : null;
}

export default ResetFreeTierUserSearch;

function getLabel(searchState: AdminUserSearch<AdminUserTypeKey.FreeTierUsers>) {
  switch (searchState.recent!.type) {
    case 'email':
      return '이메일';
    case 'fullName':
      return '이름';
    case 'freeTierStartDate':
      return '무료체험 시작일';
    case 'freeTierEndDate':
      return '무료체험 종료일';
    case 'memo':
      return '메모';
  }
}
