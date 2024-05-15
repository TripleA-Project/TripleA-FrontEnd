'use client';

import RowHeader from '@/components/Layout/Header/RowHeader';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type MenuLabel = '유저 관리' | '무료체험 관리' | '무료체험 등록';
type Menu = {
  label: MenuLabel;
  href: string;
};

const menus: Menu[] = [
  {
    label: '유저 관리',
    href: '/admin/users',
  },
  {
    label: '무료체험 관리',
    href: '/admin/users/free',
  },
  {
    label: '무료체험 등록',
    href: '/admin/users/free/register',
  },
];

function AdminUserMenuHeader() {
  return <RowHeader fullWidthTitle titleSection={<TabMenu />} />;
}

export default AdminUserMenuHeader;

const TabMenu = () => {
  const pathname = usePathname();

  const [tab, setTab] = useState<number>(initTab);

  function initTab(): number {
    const index = menus.findIndex((menu) => menu.href === pathname);

    return index === -1 ? 0 : index;
  }

  const setTabMenu = (event: React.SyntheticEvent, menuIndex: number) => {
    setTab(menuIndex);
  };

  return (
    <MenuTabs value={tab} onChange={setTabMenu} role="navigation">
      {menus.map(({ label, href }, index) => {
        return <MenuTab key={`${label}-${index}`} label={label} href={href} />;
      })}
    </MenuTabs>
  );
};

const MenuTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const MenuTab = styled((props: { label: string; href: string; selected?: boolean }) => (
  <Tab LinkComponent={'a'} disableRipple aria-current={props.selected && 'page'} {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));
