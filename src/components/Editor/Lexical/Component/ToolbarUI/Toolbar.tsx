'use client';

import { ToolbarIcons } from '@/components/Editor/Toolbar/ToolbarIcons';
import { twMerge } from 'tailwind-merge';

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ToolbarGroupWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shouldWrapperActiveStyle?: boolean;
  active?: boolean;
  activeColor?: string;
  nonActiveColor?: string;
  icon: keyof typeof ToolbarIcons;
  iconClassName?: string;
}

function Toolbar({ className, children, ...props }: ToolbarProps) {
  const classNames = twMerge([
    `box-border flex w-full items-center gap-2 overflow-auto border-b-2 border-b-[#eee] bg-white px-2 pb-2 pt-1 scrollbar-thin`,
    className,
  ]);

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default Toolbar;

Toolbar.GroupWrapper = ToolbarGroupWrapper;
Toolbar.Button = ToolbarButton;

function ToolbarGroupWrapper({ children, ...props }: ToolbarGroupWrapperProps) {
  return (
    <div className={`inline-flex items-center justify-center gap-1 align-top`} {...props}>
      {children}
    </div>
  );
}

function ToolbarButton({
  shouldWrapperActiveStyle = false,
  active = false,
  activeColor,
  nonActiveColor,
  icon,
  iconClassName,
  ...props
}: ToolbarButtonProps) {
  const buttonWrapperClassNames = twMerge([
    'flex p-1 hover:bg-gray-100',
    active && shouldWrapperActiveStyle && 'bg-blue-50',
  ]);

  const Icon = ToolbarIcons[icon];

  return (
    <div className={buttonWrapperClassNames}>
      <button className="align-top" {...props}>
        <Icon active={active} activeColor={activeColor} nonActiveColor={nonActiveColor} className={iconClassName} />
      </button>
    </div>
  );
}
