'use client';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegFile } from 'react-icons/fa';
import { RiFileEditLine } from 'react-icons/ri';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/routePath';
import { useModal } from '@/redux/slice/modalSlice';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/service/user';

export type NoticeMenuAction = 'list' | 'detail';

function AdminNoticeMenu({ action, id }: { action: NoticeMenuAction; id?: number }) {
  const { data: profile, error: profileError } = useQuery(['profile'], () => getProfile(), {
    suspense: true,
    useErrorBoundary: false,
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data.data;
    },
  });

  const { push } = useRouter();

  const [open, setOpen] = useState(false);
  const { modal, openModal } = useModal('admin:deleteNotice');

  const noticeDetailPageActions = [
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

  const noticeListPageActions = [
    {
      icon: <FaRegFile className="text-lg" />,
      name: '공지 작성',
      onClick: () => {
        push(ROUTE_PATH.NOTICE.POST);
      },
    },
  ];

  const actions = action === 'list' ? noticeListPageActions : noticeDetailPageActions;

  if (!profile || !!profileError || profile.memberRole !== 'ADMIN') return null;

  return (
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
  );
}

export default AdminNoticeMenu;
