'use client';

import Button from '@/components/Button/Button';
import { useAdminUserList } from '@/redux/slice/adminUserListSlice';
import { useAdminUserSearch, useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { toastNotify } from '@/util/toastNotify';

function ResetUsers() {
  const { search, setSearch } = useAdminUserSearch();
  const { searchStatus, setSearchStatus } = useAdminUserSearchStatus();
  const { dispatch, resetUsers } = useAdminUserList();

  const getLabel = () => {
    switch (search.recent!.type) {
      case 'email':
        return '이메일';
      case 'fullName':
        return '이름';
      case 'memberRole':
        return '권한';
      case 'membership':
        return '멤버십';
    }
  };

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
      <span>{`"${getLabel()}"`}&nbsp;</span>
      <span>검색결과 초기화</span>
    </Button>
  ) : null;
}

export default ResetUsers;
