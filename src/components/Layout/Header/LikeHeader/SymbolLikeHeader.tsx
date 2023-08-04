'use client';

import { useRouter } from 'next/navigation';
import Header from '..';
import LikeButton from './LikeButton';
import { AppIcons } from '@/components/Icons';
import { type Symbol } from '@/interfaces/Symbol';

interface SymbolLikeHeaderProps {
  symbol?: Symbol;
}

function SymbolLikeHeader({ symbol }: SymbolLikeHeaderProps) {
  const { back } = useRouter();

  return (
    <Header fixed>
      <AppIcons.BackArrow.Bar className="cursor-pointer" onClick={() => back()} />
      <h2 className="text-2xl font-bold text-[#131F3C]">{symbol?.symbol?.toUpperCase() ?? 'Notfound Symbol'}</h2>
      {symbol ? <LikeButton symbol={symbol} /> : <AppIcons.Heart.Fill.Gray />}
    </Header>
  );
}

export default SymbolLikeHeader;
