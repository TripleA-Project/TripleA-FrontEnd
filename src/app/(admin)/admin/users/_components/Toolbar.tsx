'use client';

import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import { useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';
import { useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { AdminModalType, useModal } from '@/redux/slice/modalSlice';
import { toastNotify } from '@/util/toastNotify';

function Toolbar() {
  const { selectedUsers, clearSelectedUsers, dispatch } = useAdminSelectedUserList();
  const { openModal } = useModal();

  const clear = () => {
    dispatch(clearSelectedUsers());
  };

  const openUserManangeModal = (modalType: AdminModalType) => () => {
    switch (modalType) {
      case 'admin:deleteUser':
        openModal('admin:deleteUser', {
          selectedUsers,
        });

        return;
      case 'admin:asAdmin':
        const alreayHasAdminRoleUsers = selectedUsers.filter((user) => user.memberRole === 'ADMIN');

        if (alreayHasAdminRoleUsers.length) {
          toastNotify(
            'error',
            alreayHasAdminRoleUsers.length === 1
              ? `관리자인 유저가 포함 되있습니다 (${alreayHasAdminRoleUsers[0].email})`
              : `관리자인 유저가 포함 되있습니다 (${alreayHasAdminRoleUsers[0].email} 외 ${
                  alreayHasAdminRoleUsers.length - 1
                }명)`,
          );

          return;
        }

        openModal('admin:asAdmin', {
          selectedUsers,
        });

        return;
      case 'admin:asUser':
        const alreayHasUserRoleUsers = selectedUsers.filter((user) => user.memberRole === 'USER');

        if (alreayHasUserRoleUsers.length) {
          toastNotify(
            'error',
            alreayHasUserRoleUsers.length === 1
              ? `일반 유저가 포함 되있습니다 (${alreayHasUserRoleUsers[0].email})`
              : `일반 유저가 포함 되있습니다 (${alreayHasUserRoleUsers[0].email} 외 ${
                  alreayHasUserRoleUsers.length - 1
                }명)`,
          );

          return;
        }

        openModal('admin:asUser', {
          selectedUsers,
        });

        return;
    }
  };

  if (!selectedUsers?.length) return null;

  return (
    <div className="fixed_inner fixed top-[calc(52px+16px)] z-[5] h-[64px] w-full px-2">
      <div className="flex h-full w-full items-center justify-between gap-3 bg-slate-700 p-2 @container/box">
        <div className="-mt-[5px] flex flex-wrap items-center gap-2 @[392.5px]/box:mt-0">
          <div>
            <span
              className="text-sm font-bold text-white underline underline-offset-4 hover:cursor-pointer"
              onClick={() => openModal('selected:user', { selectedUsers })}
            >
              선택한 유저 {selectedUsers.length}명
            </span>
            <span className="text-sm font-bold text-white">을</span>
          </div>
          <div className="flex gap-2">
            <Button
              className="h-fit w-fit px-2 py-1 text-xs"
              bgColorTheme="orange"
              textColorTheme="white"
              onClick={openUserManangeModal('admin:deleteUser')}
            >
              탈퇴
            </Button>
            <Button
              className="h-fit w-fit px-2 py-1 text-xs"
              bgColorTheme="orange"
              textColorTheme="white"
              onClick={openUserManangeModal('admin:asAdmin')}
            >
              관리자로 지정
            </Button>
            <Button
              className="h-fit w-fit px-2 py-1 text-xs"
              bgColorTheme="orange"
              textColorTheme="white"
              onClick={openUserManangeModal('admin:asUser')}
            >
              유저로 지정
            </Button>
          </div>
        </div>
        <Button onClick={clear} className="h-fit w-fit px-2 py-1" bgColorTheme="none" textColorTheme="white">
          <AppIcons.CloseFill.Orange />
        </Button>
      </div>
      <PreventToolbar />
    </div>
  );
}

export default Toolbar;

const PreventToolbar = () => {
  const { searchStatus } = useAdminUserSearchStatus();

  if (searchStatus !== 'loading') return null;

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/60 text-sm font-bold backdrop-blur-sm">
      <div className="box-content flex h-8 w-8 items-center justify-center rounded-full bg-white p-1">
        <AppIcons.Lock className="w-8 translate-x-[2.5px]" />
      </div>
    </div>
  );
};
