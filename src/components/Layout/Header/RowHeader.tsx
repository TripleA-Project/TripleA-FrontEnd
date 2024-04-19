'use client';

import GradientBox from '@/components/UI/Gradient/GradientBox';
import { twMerge } from 'tailwind-merge';

interface RowHeaderProps {
  leftSection?: React.ReactNode;
  titleSection: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidthTitle?: boolean;
  className?: string;
  gradientBottom?: boolean | React.ReactElement | JSX.Element;
}

function RowHeader({
  leftSection,
  titleSection,
  rightSection,
  fullWidthTitle = false,
  gradientBottom,
  className,
}: RowHeaderProps) {
  const classNames = twMerge(['fixed_inner fixed z-[10] flex h-[52px] items-center bg-white', className]);

  const GradientBottom = () => {
    if (typeof gradientBottom === 'boolean') {
      return gradientBottom === true ? <GradientBox /> : null;
    }

    return <>{gradientBottom}</>;
  };

  return (
    <header className={classNames}>
      {fullWidthTitle ? null : <section className="flex-none basis-[20%]">{leftSection}</section>}
      <section className="flex-1 text-center">{titleSection}</section>
      {fullWidthTitle ? null : <section className="flex-none basis-[20%]">{rightSection}</section>}
      <GradientBottom />
    </header>
  );
}

export default RowHeader;
