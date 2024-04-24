'use client';

import { ROUTE_PATH } from '@/constants/routePath';
import { useAdminVerify } from '@/hooks/useAdminVerify';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, SpeedDialProps } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { IoClose, IoMenu } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { TfiWrite } from 'react-icons/tfi';

interface MenuAction {
  icon: React.ReactNode;
  href: string;
  name: string;
}

type MenuActions = MenuAction[];

function AdminLinkMenu() {
  const { push } = useRouter();
  const pathname = usePathname();

  const { verified, adminVerify } = useAdminVerify();
  const [open, setOpen] = useState(false);

  const hidden =
    pathname.startsWith('/admin') || pathname.startsWith('/notice') || pathname === '/login' || pathname === '/logout';

  const menuOpen: NonNullable<SpeedDialProps['onOpen']> = (event, reason) => {
    setOpen(true);
  };

  const menuClose: NonNullable<SpeedDialProps['onClose']> = (event, reason) => {
    setOpen(false);
  };

  const adminLinkMenuActions: MenuActions = [
    {
      icon: <ImExit className="text-xl" />,
      href: ROUTE_PATH.LOGOUT,
      name: '로그아웃',
    },
    {
      icon: <TfiWrite className="text-xl" />,
      href: ROUTE_PATH.ADMIN.NOTICE.LIST,
      name: '공지사항',
    },
    {
      icon: <MdManageAccounts className="text-xl" />,
      href: ROUTE_PATH.ADMIN.MANAGE_USER,
      name: '유저 관리',
    },
    {
      icon: <FaChartBar className="text-xl" />,
      href: ROUTE_PATH.ADMIN.DASH_BOARD,
      name: '통계',
    },
  ];

  useEffect(() => {
    adminVerify();
  }, [pathname]); /* eslint-disable-line */

  return !hidden && verified ? (
    <div className="fixed_inner fixed bottom-[78.5px] h-[40px] !p-0">
      <SpeedDial
        open={open}
        ariaLabel="admin link speedDial"
        direction="up"
        sx={{
          position: 'absolute',
          '&.MuiSpeedDial-directionUp': {
            bottom: '0',
            right: '2px',
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
        onOpen={menuOpen}
        onClose={menuClose}
      >
        {adminLinkMenuActions.map(({ icon, href, name }) => {
          return <SpeedDialAction key={name} icon={icon} tooltipTitle={name} onClick={() => push(href)} />;
        })}
      </SpeedDial>
    </div>
  ) : null;
}

export default AdminLinkMenu;
