import { twMerge } from 'tailwind-merge';
import { BiRedo, BiUndo } from 'react-icons/bi';
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai';
import { MdAddLink, MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight } from 'react-icons/md';
import { BsImage, BsLink45Deg, BsListOl, BsListUl } from 'react-icons/bs';
import type { IconBaseProps, IconType } from 'react-icons';
import type { FontToolbarNames, HistoryToolbarNames, ImageToolbarNames, LinkToolbarNames, ListToolbarNames } from './';

interface ToolbarIconProps extends IconBaseProps {
  active?: boolean;
  activeColor?: string;
  nonActiveColor?: string;
  icon: IconType;
}

interface ToolbarIcon {
  (props: Omit<ToolbarIconProps, 'icon'>): JSX.Element;
}

export type AlignNames = 'AlignLeft' | 'AlignCenter' | 'AlignRight';

type ToolbarNames =
  | HistoryToolbarNames
  | FontToolbarNames
  | LinkToolbarNames
  | AlignNames
  | ListToolbarNames
  | ImageToolbarNames;

type ToolbarIconsType = Record<ToolbarNames, ToolbarIcon>;

export const ToolbarIcons: ToolbarIconsType = {
  Undo: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon icon={BiUndo} active={active} activeColor={activeColor} nonActiveColor={nonActiveColor} {...props} />
    );
  },
  Redo: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon icon={BiRedo} active={active} activeColor={activeColor} nonActiveColor={nonActiveColor} {...props} />
    );
  },
  Bold: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={AiOutlineBold}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  Italic: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={AiOutlineItalic}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  Link: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={BsLink45Deg}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  OpenGraphLink: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={MdAddLink}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  AlignLeft: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={MdFormatAlignLeft}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  AlignCenter: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={MdFormatAlignCenter}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  AlignRight: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={MdFormatAlignRight}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  UnOrderedList: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={BsListUl}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  OrderedList: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={BsListOl}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
  Image: ({ active, activeColor, nonActiveColor, ...props }) => {
    return (
      <ToolbarIcon
        icon={BsImage}
        active={active}
        activeColor={activeColor}
        nonActiveColor={nonActiveColor}
        {...props}
      />
    );
  },
};

function ToolbarIcon({
  active = false,
  activeColor = '#ff8503',
  nonActiveColor = '#1f1f1f',
  icon,
  className,
  ...props
}: ToolbarIconProps) {
  const classNames = twMerge([`shrink-0 text-xl`, className]);

  const Icon = icon;

  return <Icon className={classNames} style={{ color: active ? activeColor : nonActiveColor }} {...props} />;
}
