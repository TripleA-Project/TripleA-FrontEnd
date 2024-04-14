import { useAdminUserList } from '@/redux/slice/adminUserListSlice';
import { useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';

function UserTableSearching() {
  const { users } = useAdminUserList();
  const { searchStatus } = useAdminUserSearchStatus();

  return searchStatus === 'loading' || !users.length ? (
    <tr className="absolute left-0 top-0 z-[3] h-full min-h-[300px] w-full">
      <td className="sticky top-[calc(52px+64px+57px)] block h-full w-full">
        <span className="block h-full w-full bg-white/60 font-bold backdrop-blur-sm">
          {searchStatus === 'loading' && <span className="sticky top-1/2 flex w-full justify-center">검색 중...</span>}
          {searchStatus === 'success' && !users.length && (
            <span className="flex h-full w-full items-center justify-center">일치하는 유저가 없습니다.</span>
          )}
        </span>
      </td>
    </tr>
  ) : null;
}

export default UserTableSearching;
