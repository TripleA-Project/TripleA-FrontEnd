'use client';

import { BsBookmark, BsBookmarkFill, BsFillShareFill, BsGrid3X3GapFill } from 'react-icons/bs';
import { BiNews } from 'react-icons/bi';
import {
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineArrowLeft,
  AiOutlineLeft,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineRight,
} from 'react-icons/ai';
import { MdCancel, MdOutlineLocalFireDepartment, MdInfoOutline } from 'react-icons/md';
import { TfiExport } from 'react-icons/tfi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiPencilFill } from 'react-icons/ri';
import { FiSearch, FiX } from 'react-icons/fi';

interface IconProps {
  className?: string;
  onClick?: () => void;
}

export const HeartIcon = ({ className, onClick }: IconProps) => {
  // const handleClick = async () => {
  //   if (onClick) await onClick();
  // };

  return (<>
    <AiOutlineHeart className={className} onClick={onClick} />;
    </>)
};
export const HeartFillIcon = ({ className,onClick }: IconProps) => {
  return <AiFillHeart className={className} onClick={onClick} />;
};
export const BookMarkIcon = ({ className ,onClick}: IconProps) => {
  return <BsBookmark className={className}  onClick={onClick}/>;
};
export const BookMarkFillIcon = ({ className ,onClick}: IconProps) => {
  return <BsBookmarkFill className={className}  onClick={onClick}/>;
};
export const ShareIcon = ({ className ,onClick}: IconProps) => {
  return <BsFillShareFill className={className}  onClick={onClick}/>;
};
export const ExportIcon = ({ className,onClick }: IconProps) => {
  return <TfiExport className={className}  onClick={onClick}/>;
};
export const ArrowLeftIcon = ({ className,onClick }: IconProps) => {
  return <AiOutlineArrowLeft className={className}  onClick={onClick}/>;
};
export const LeftIcon = ({ className,onClick }: IconProps) => {
  return <AiOutlineLeft className={className}  onClick={onClick}/>;
};
export const DownIcon = ({ className,onClick }: IconProps) => {
  return <AiOutlineDown className={className}  onClick={onClick}/>;
};
export const RightIcon = ({ className ,onClick}: IconProps) => {
  return <AiOutlineRight className={className}  onClick={onClick}/>;
};
export const UpIcon = ({ className ,onClick}: IconProps) => {
  return <AiOutlineUp className={className}  onClick={onClick}/>;
};
export const CheckIcon = ({ className ,onClick}: IconProps) => {
  return <AiOutlineCheckCircle className={className}  onClick={onClick}/>;
};
export const CheckFillIcon = ({ className ,onClick}: IconProps) => {
  return <AiFillCheckCircle className={className}  onClick={onClick}/>;
};
export const SearchIcon = ({ className,onClick }: IconProps) => {
  return <AiOutlineSearch className={className}  onClick={onClick}/>;
};
export const SearchShortIcon = ({ className ,onClick}: IconProps) => {
  return <FiSearch className={className}  onClick={onClick}/>;
};
export const XIcon = ({ className,onClick }: IconProps) => {
  return <FiX className={className}  onClick={onClick}/>;
};
export const XFillIcon = ({ className,onClick }: IconProps) => {
  return <MdCancel className={className}  onClick={onClick}/>;
};
export const PencilIcon = ({ className,onClick }: IconProps) => {
  return <RiPencilFill className={className}  onClick={onClick}/>;
};
export const NewsIcon = ({ className,onClick }: IconProps) => {
  return <BiNews className={className}  onClick={onClick}/>;
};
export const GridIcon = ({ className ,onClick}: IconProps) => {
  return <BsGrid3X3GapFill className={className} onClick={onClick} />;
};
export const FireIcon = ({ className ,onClick}: IconProps) => {
  return <MdOutlineLocalFireDepartment className={className} onClick={onClick} />;
};
export const InfoIcon = ({ className,onClick }: IconProps) => {
  return <MdInfoOutline className={className}  onClick={onClick}/>;
};
export const HamburgerIcon = ({ className,onClick }: IconProps) => {
  return <GiHamburgerMenu className={className}  onClick={onClick}/>;
};
