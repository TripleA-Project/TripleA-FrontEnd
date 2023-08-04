import { IconBaseProps } from 'react-icons';
import { GoHome, GoHomeFill } from 'react-icons/go';
import {
  MdInsertChartOutlined,
  MdInsertChart,
  MdOutlineSearch,
  MdOutlineFeed,
  MdFeed,
  MdAccountCircle,
} from 'react-icons/md';
import { type NavPaths } from '.';

interface NavIconProps extends IconBaseProps {
  active?: boolean;
}

interface NavIcon {
  (props: NavIconProps): JSX.Element;
}

type NavIconsType = Record<NavPaths, NavIcon>;

export const NavIcons: NavIconsType = {
  Home: ({ active, ...props }) =>
    active ? (
      <GoHomeFill className={`shrink-0 text-2xl text-black`} {...props} />
    ) : (
      <GoHome className={`shrink-0 text-2xl text-[#C6C6C6]`} {...props} />
    ),
  Chart: ({ active, ...props }) =>
    active ? (
      <MdInsertChart className={`shrink-0 text-2xl text-black`} {...props} />
    ) : (
      <MdInsertChartOutlined className={`shrink-0 text-2xl text-[#C6C6C6]`} {...props} />
    ),
  Search: ({ active, ...props }) => (
    <MdOutlineSearch className={`shrink-0 text-2xl ${active ? 'text-black' : 'text-[#C6C6C6]'}`} {...props} />
  ),
  History: ({ active, ...props }) =>
    active ? (
      <MdFeed className={`shrink-0 text-2xl text-black`} {...props} />
    ) : (
      <MdOutlineFeed className={`shrink-0 text-2xl text-[#C6C6C6]`} {...props} />
    ),
  Mypage: ({ active, ...props }) => (
    <MdAccountCircle className={`shrink-0 text-2xl ${active ? 'text-black' : 'text-[#C6C6C6]'}`} {...props} />
  ),
};
