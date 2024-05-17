'use client';

import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { SyntheticEvent, useEffect, useState } from 'react';
import MenuAction from './MenuAction';
import { AdminUserTypeKey, useAdminSelectedUserList } from '@/redux/slice/adminUserListSlice';
import { useModal } from '@/redux/slice/modalSlice';
import { FaUserCheck } from 'react-icons/fa';
import Button from '@/components/Button/Button';

const SlideTransition = ({ timeout, ...props }: SlideProps) => {
  return <Slide direction="up" timeout={{ exit: 150 }} {...props} />;
};

function ActionControl() {
  const [controlOpen, setControlOpen] = useState(false);

  const { selectedUsers, dispatch, clearSelectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const closeControl = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    if (reason === 'escapeKeyDown') return;

    setControlOpen(false);
    dispatch(clearSelectedUsers());
  };

  useEffect(() => {
    setControlOpen(selectedUsers?.length ? true : false);
  }, [selectedUsers]);

  return (
    <Snackbar
      key={SlideTransition.name}
      open={controlOpen}
      onClose={closeControl}
      TransitionComponent={SlideTransition}
      ContentProps={{
        sx: {
          width: '100%',
        },
      }}
      message={<Message />}
      action={<MenuAction onClose={closeControl as any} />}
      sx={{
        left: {
          xs: 0,
          sm: 0,
        },
        right: {
          xs: 0,
          sm: 0,
        },
        bottom: {
          xs: 58,
          sm: 58,
        },
        zIndex: 9,
        margin: 'auto',
        padding: '4px 8px',
        maxWidth: '768px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    />
  );
}

export default ActionControl;

const Message = () => {
  const { openModal } = useModal('selected:freeTier');

  const { selectedUsers } = useAdminSelectedUserList<AdminUserTypeKey.FreeTierUsers>();

  const openSelctedUserModal = () => {
    openModal('selected:freeTier', { selectedUsers });
  };

  return (
    <div className="w-[calc(100vw-32px)] max-w-[720px]">
      <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-white">메뉴를 선택해주세요</span>
        <Button
          bgColorTheme="none"
          textColorTheme="none"
          className="flex h-fit w-fit items-center gap-x-1 bg-slate-700 px-2 py-1 text-white"
          onClick={openSelctedUserModal}
        >
          <FaUserCheck />
          <span>선택 유저 확인</span>
        </Button>
      </div>
    </div>
  );
};
