'use client';

import { type IconBaseProps } from 'react-icons';
import { BiArrowBack } from 'react-icons/bi';
import { AppIcons, IconProp } from '@/components/Icons';

interface BackButtonProps extends IconBaseProps {}

export function NoBarBackArrowButton({ onClick, ...props }: IconProp) {
  return <AppIcons.BackArrow.NoBar className="shrink-0 cursor-pointer" onClick={onClick} {...props} />;
}

export function BackArrowButton({ onClick, ...props }: BackButtonProps) {
  return <BiArrowBack className="shrink-0 cursor-pointer text-[24px]" onClick={onClick} {...props} />;
}
