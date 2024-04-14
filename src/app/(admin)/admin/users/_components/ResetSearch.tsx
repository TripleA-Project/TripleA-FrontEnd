'use client';

import Button from '@/components/Button/Button';
import { resetUsers, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import {
  setSearch,
  setSearchStatus,
  useAdminUserSearch,
  useAdminUserSearchStatus,
} from '@/redux/slice/adminUserSearchSlice';
import { toastNotify } from '@/util/toastNotify';

function ResetUsers() {
  const { search } = useAdminUserSearch();
  const { searchStatus } = useAdminUserSearchStatus();
  const { dispatch } = useAdminUserList();

  const resetUserList = () => {
    if (searchStatus === 'loading') {
      toastNotify('error', '검색 이후 초기화가 가능합니다.');

      return;
    }

    dispatch(
      setSearch({
        ...search,
        type: 'email',
        value: '',
        recent: '',
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
      <span>{search.type} 검색결과 초기화</span>
    </Button>
  ) : null;
}

export default ResetUsers;
