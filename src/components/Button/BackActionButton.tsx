'use client';

import { possibleGotoBack } from '@/util/historySession';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

interface BackActionButtonProps {
  initialPath?: string;
  className?: string;
  icon?: React.ReactNode;
}

function BackActionButton({ initialPath = '/', icon, className }: BackActionButtonProps) {
  const classNames = twMerge(['box-border flex items-center justify-center p-1', className]);

  const { push, back } = useRouter();

  const onClick = () => {
    if (possibleGotoBack()) {
      back();

      return;
    }

    push(initialPath);
  };

  return (
    <button className={classNames} onClick={onClick}>
      {icon ?? <IoChevronBack className="shrink-0 text-xl" />}
    </button>
  );
}

export default BackActionButton;
