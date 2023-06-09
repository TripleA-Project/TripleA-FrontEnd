import { HiHome } from 'react-icons/hi';
import { HiSearch } from 'react-icons/hi';
import { HiChartBar } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import { IoNewspaperOutline } from 'react-icons/io5';

export const NavItemData = [
  { pathName: '/', name: '뉴스', Icon: HiHome },
  { pathName: '/chart', name: '차트', Icon: HiChartBar },
  { pathName: '/search', name: '검색', Icon: HiSearch },
  { pathName: '/read', name: '내가 본', Icon: IoNewspaperOutline },
  { pathName: '/me', name: 'MY', Icon: HiUser },
];
