'use client';

import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import { AdminUserTypeKey, useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';
import { useModal } from '@/redux/slice/modalSlice';

interface MenuActionProps {
  onClose: () => void;
}

function MenuAction({ onClose }: MenuActionProps) {
  return (
    <div className="flex items-center gap-x-4">
      <MenuListButtonGroup />
      <CloseButton onClose={onClose} />
    </div>
  );
}

export default MenuAction;

const MenuListButtonGroup = () => {
  return (
    <div className="flex items-center gap-x-2">
      <UpdateButton />
      <DeleteButton />
    </div>
  );
};

const UpdateButton = () => {
  const { openModal } = useModal('admin:updateFreeTrial');

  const { selectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const openUpdateFreeTrialModal = () => {
    openModal('admin:updateFreeTrial', {
      idList: selectedUsers.map((user) => user.id),
    });
  };

  return (
    <Button
      onClick={openUpdateFreeTrialModal}
      bgColorTheme="orange"
      textColorTheme="white"
      className="h-fit w-fit rounded-md px-2 py-1 text-xs"
    >
      무료체험 수정
    </Button>
  );
};

const DeleteButton = () => {
  const { openModal } = useModal('admin:deleteFreeTrial');

  const { selectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const openDeleteFreeTrialModal = () => {
    openModal('admin:deleteFreeTrial', {
      idList: selectedUsers.map((user) => user.id),
    });
  };

  return (
    <Button
      onClick={openDeleteFreeTrialModal}
      bgColorTheme="orange"
      textColorTheme="white"
      className="h-fit w-fit rounded-md px-2 py-1 text-xs"
    >
      무료체험 종료(삭제)
    </Button>
  );
};

const CloseButton = ({ onClose }: Pick<MenuActionProps, 'onClose'>) => {
  return (
    <Button bgColorTheme="none" textColorTheme="none" className="h-fit w-fit p-0.5" onClick={onClose}>
      <AppIcons.CloseFill.DarkGray />
    </Button>
  );
};
