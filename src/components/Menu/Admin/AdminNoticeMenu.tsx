'use client';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegFile } from 'react-icons/fa';
import { RiFileEditLine } from 'react-icons/ri';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import React, { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/routePath';
import { useModal } from '@/redux/slice/modalSlice';
import { useAdminVerify } from '@/hooks/useAdminVerify';

export type NoticeMenuAction = 'list' | 'detail';

interface MenuAction {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

type MenuActions = MenuAction[];

function AdminNoticeMenu() {
  const { push } = useRouter();
  const pathname = usePathname();

  const { verified, adminVerify } = useAdminVerify();
  const [open, setOpen] = useState(false);
  const { modal, openModal } = useModal('admin:deleteNotice');

  const hidden = modal.open || (!pathname.startsWith('/notice') && !pathname.startsWith('/admin/notice'));

  const id = Number(pathname.replace(/^(\/notice\/)|(\/admin\/notice\/)/g, ''));

  const noticeDetailPageActions: MenuActions = [
    {
      icon: <RiFileEditLine className="text-xl" />,
      name: '공지 수정',
      onClick: () => {
        push(ROUTE_PATH.NOTICE.UPDATE(id!));
      },
    },
    {
      icon: <AiOutlineDelete className="text-xl" />,
      name: '공지 삭제',
      onClick: () => {
        openModal('admin:deleteNotice', {
          noticeId: id!,
        });
      },
    },
  ];

  const noticeListPageActions: MenuActions = [
    {
      icon: <FaRegFile className="text-lg" />,
      name: '공지 작성',
      onClick: () => {
        push(ROUTE_PATH.NOTICE.POST);
      },
    },
  ];

  const action: NoticeMenuAction =
    pathname === ROUTE_PATH.NOTICE.LIST || pathname === ROUTE_PATH.ADMIN.NOTICE.LIST ? 'list' : 'detail';
  const actions = action === 'list' ? noticeListPageActions : noticeDetailPageActions;

  useLayoutEffect(() => {
    adminVerify();
  }, [pathname]); /* eslint-disable-line */

  return !hidden && verified ? (
    <div className="fixed_inner fixed bottom-[78.5px] h-[40px] !p-0">
      <SpeedDial
        hidden={modal.open}
        open={open}
        ariaLabel="notice speedDial"
        direction="up"
        sx={{
          position: 'absolute',
          '&.MuiSpeedDial-directionUp': {
            bottom: '0',
            right: '8px',
          },
        }}
        FabProps={{
          size: 'small',
          sx: {
            ['&[aria-expanded="false"]']: {
              backgroundColor: '#fff',
            },
            ['&[aria-expanded="true"]']: {
              backgroundColor: '#1565c0',
            },
          },
        }}
        icon={
          <SpeedDialIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              [`.MuiSpeedDialIcon-icon`]: {
                color: '#000',
              },
            }}
            icon={<IoMenu />}
            openIcon={<IoClose />}
          />
        }
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {actions.map(({ icon, name, onClick }) => {
          return (
            <SpeedDialAction
              key={name}
              icon={icon}
              tooltipTitle={name}
              onClick={() => {
                setOpen(false);

                setTimeout(() => {
                  onClick();
                }, 0);
              }}
            />
          );
        })}
      </SpeedDial>
    </div>
  ) : null;
}

export default AdminNoticeMenu;
