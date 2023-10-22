import { twMerge } from 'tailwind-merge';
import { BiRedo, BiSolidColorFill, BiUndo } from 'react-icons/bi';
import { AiOutlineBold, AiOutlineFontSize, AiOutlineItalic } from 'react-icons/ai';
import { MdAddLink, MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight } from 'react-icons/md';
import { BsLink45Deg, BsListOl, BsListUl } from 'react-icons/bs';
import { ImTextColor } from 'react-icons/im';
import type { IconBaseProps } from 'react-icons';
import type { HistoryToolbarNames } from './HistoryToolbar';
import type { FontToolbarNames } from './FontToolbar';
import type { ListToolbarNames } from './ListToolbar';

interface ToolbarIconProps extends IconBaseProps {
  active?: boolean;
}

interface ToolbarIcon {
  (props: ToolbarIconProps): JSX.Element;
}

export type AlignNames = 'AlignLeft' | 'AlignCenter' | 'AlignRight';

type ToolbarNames = HistoryToolbarNames | FontToolbarNames | AlignNames | ListToolbarNames;

type ToolbarIconsType = Record<ToolbarNames, ToolbarIcon>;

export const ToolbarIcons: ToolbarIconsType = {
  Undo: ({ active, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <BiUndo className={classNames} {...props} />;
  },
  Redo: ({ active, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <BiRedo className={classNames} {...props} />;
  },
  Bold: ({ active, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <AiOutlineBold className={classNames} {...props} />;
  },
  Italic: ({ active, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <AiOutlineItalic className={classNames} {...props} />;
  },
  FontSize: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <AiOutlineFontSize className={classNames} {...props} />;
  },
  FontColor: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <ImTextColor className={classNames} {...props} />;
  },
  BackgroundColor: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <BiSolidColorFill className={classNames} {...props} />;
  },
  Link: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <BsLink45Deg className={classNames} {...props} />;
  },
  OpenGraphLink: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <MdAddLink className={classNames} {...props} />;
  },
  AlignLeft: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <MdFormatAlignLeft className={classNames} {...props} />;
  },
  AlignCenter: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <MdFormatAlignCenter className={classNames} {...props} />;
  },
  AlignRight: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <MdFormatAlignRight className={classNames} {...props} />;
  },
  UnOrderedList: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <BsListUl className={classNames} {...props} />;
  },
  OrderedList: ({ active = true, className, ...props }) => {
    const classNames = getIconClassNames({ active, classNameProp: className });

    return <BsListOl className={classNames} {...props} />;
  },
};

function getIconClassNames({ active, classNameProp }: { active?: boolean; classNameProp?: string }) {
  const iconActiveClassName = `text-black`;

  return twMerge([getIconBaseClassNames(), classNameProp, active && iconActiveClassName]);
}

function getIconBaseClassNames() {
  return `shrink-0 text-xl text-[#C6C6C6]`;
}
