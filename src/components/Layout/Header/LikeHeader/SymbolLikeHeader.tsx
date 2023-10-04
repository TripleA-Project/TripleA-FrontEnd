'use client';

import { useRouter } from 'next/navigation';
import Header from '..';
import LikeButton from './LikeButton';
import { AppIcons } from '@/components/Icons';

interface SymbolLikeHeaderProps {
  symbolName?: string | null;
}

function SymbolLikeHeader({ symbolName }: SymbolLikeHeaderProps) {
  const { back } = useRouter();

  return (
    <Header fixed>
      <AppIcons.BackArrow.NoBar className="cursor-pointer" onClick={() => back()} />
      <h2 className="text-2xl font-bold text-[#131F3C]">{symbolName?.toUpperCase() ?? 'Notfound Symbol'}</h2>
      <LikeButton symbolName={symbolName} />
    </Header>
  );
}

export default SymbolLikeHeader;
